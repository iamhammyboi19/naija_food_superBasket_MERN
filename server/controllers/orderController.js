const Order = require("../models/orderModel");
const CustomError = require("../utils/CustomError");
const https = require("https");
const ApiFeatures = require("../utils/apiFeatures");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

// stripe create order payment checkout session
exports.order_checkout_session = async (req, res, next) => {
  try {
    const user = req.current_user;
    const cart = user?.cart;
    if (user?.cart?.length === 0 || user?.cart?.length === undefined) {
      return next(
        new CustomError(
          "There is no menu in the cart to checkout. Please add menu to your cart and try again",
          400
        )
      );
    }

    const session = await stripe.checkout.sessions.create({
      // dummy route before using webhook
      payment_method_types: ["card"],
      success_url: "http://127.0.0.1:5173/ordersuccessful",
      cancel_url: "http://127.0.0.1:5173/ordersuccessful",
      client_reference_id: user._id,
      customer_email: user.email_address,
      line_items: cart.map((el) => ({
        adjustable_quantity: { enabled: true },
        price_data: {
          currency: "ngn",
          unit_amount: el.price,
          product_data: {
            name: el.menu_name,
            description: el.menu_desc,
            images: [el.menu_image],
            meta_data: el.toppings,
          },
        },
        quantity: el.quantity,
      })),
      mode: "payment",
      metadata: {},
    });

    res.status(200).json({
      status: "success",
      session,
    });
  } catch (err) {
    next(err);
  }
};

const options = {
  hostname: "api.paystack.co",
  port: 443,
  path: "/transaction/initialize",
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_API_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
};

// PAYSTACK INITIALIZE TRANSACTION
// "cancel_action": "https://your-cancel-url.com" -> add to metadata in production
//
exports.order_paystack_payment = async (req, res, next) => {
  try {
    const { current_user } = req;

    if (
      current_user?.carts?.length === 0 ||
      current_user?.carts?.length === undefined
    ) {
      return next(new CustomError("You have not items in your cart", 400));
    }

    const amount =
      current_user.carts
        .map((item) => item.total_price)
        .reduce((acc, cur_val) => acc + cur_val, 0) * 100;

    const value = current_user.carts
      .map((item) => `${item.quantity} ${item.menu_name}`)
      .join(", ");

    const ordered_items = current_user.carts;

    const params = JSON.stringify({
      amount,
      email: current_user.email_address,
      currency: "NGN",
      reference: current_user._id + Date.now(),
      callback_url: "https://naija-food-super-basket-mern-frontend.vercel.app/",
      meta_data: {
        ordered_items,
        custom_fields: [
          {
            display_name: "Your order summary",
            variable_name: "your_order_summary",
            value,
          },
        ],
      },
    });

    const req_paystack = https
      .request(options, (res_paystack) => {
        let data = "";

        res_paystack.on("data", (chunk) => {
          data += chunk;
        });

        res_paystack.on("end", () => {
          return res.status(200).json({
            status: "success",
            data: JSON.parse(data),
          });
        });
      })
      .on("error", (error) => {
        return next(error);
      });

    req_paystack.write(params);
    req_paystack.end();

    // NO WEBHOOK YET SO I'M JUST CREATING ORDER THROUGH THIS
    // this is bad i know
    try {
      await Order.create({
        restaurant: ordered_items?.at(0).restaurant,
        user: current_user._id,
        email: current_user.email_address,
        phone_number: current_user.phone_number,
        automatically_cancel_unaccepted_order_at: new Date(
          Date.now() + +process.env.ORDER_NOT_ACCEPTED_CANCEL_AT * 60 * 1000
        ),
        amount: amount / 100,
        createdAt: new Date(Date.now()),
        order_data: {
          menu_details: ordered_items,
          items_number: ordered_items?.length,
          address: { ...current_user.location?.at(0) },
          total_price: amount / 100,
          delivery_fee: 0,
        },
      });
      current_user.carts = [];
      current_user.markModified("carts");
      await current_user.save({ validateBeforeSave: false });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.get_all_orders = async (req, res, next) => {
  try {
    const { current_user } = req;
    let doc;
    if (current_user.role === "user") {
      doc = new ApiFeatures(Order.find({ user: current_user._id }), req.query)
        .filter()
        .sort()
        .limit_selected_fields()
        .paginate();
    } else if (current_user.role === "restaurant") {
      doc = new ApiFeatures(
        Order.find({ restaurant: current_user._id }),
        req.query
      )
        .filter()
        .sort()
        .limit_selected_fields()
        .paginate();
    }

    const orders = await doc.query;

    res.status(200).json({
      status: "success",
      data: orders,
      results: orders?.length,
    });
  } catch (err) {
    next(err);
  }
};

exports.get_specific_order = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findById(order_id);

    if (!order) {
      return next(new CustomError("There is no order with this ID", 404));
    }

    // IF ORDER IS NOT ACCEPTED AUTOMATICALLY CANCEL
    if (
      order.automatically_cancel_unaccepted_order_at !== null &&
      Date.now() > order.automatically_cancel_unaccepted_order_at
    ) {
      order.automatically_cancel_unaccepted_order_at = null;
      order.stage = 0;
      // STAGE 1 MEANS ORDER GETS CANCELLED BEFORE IT GOT ACCEPTED BY RESTAURANT
      order.cancelled_stage = 1;
      order.status = "cancelled";
      order.current_order_status = "order_cancelled";
      order.cancelled = true;
      order.automatically_cancelled = true;
      order.reason_for_cancel =
        "Automatically cancelled by the system because restaurant did not accept order on time";
      await order.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

/*

const all_order_status = [
  "order_placed",
  "order_confirmed",
  "order_ready",
  "rider_pickup",
  "order_delivered",
  "order_cancelled",
];

*/

exports.update_order_status = async (req, res, next) => {
  try {
    const { order_status, order_cancel_reason } = req.body;
    const { order_id } = req.params;

    const order = await Order.findById(order_id);

    if (!order) {
      return next(new CustomError("There is no order with this ID", 404));
    }

    // AFTER ACCEPTING ORDER. RESTAURANT CAN UPDATE ORDER STATUS
    if (order_status === "order_ready") {
      order.stage = 3;
      order.current_order_status = "order_ready";
    } else if (order_status === "rider_pickup") {
      order.stage = 4;
      order.current_order_status = "rider_pickup";
    } else if (order_status === "order_delivered") {
      order.stage = 5;
      order.current_order_status = "order_delivered";
      order.status = "completed";
    } else if (order_status === "order_cancelled") {
      order.cancelled_stage = order.stage;
      order.reason_for_cancel = order_cancel_reason;
      order.stage = 0;
      order.automatically_cancelled = false;
      order.current_order_status = "order_cancelled";
      order.status = "cancelled";
      order.cancelled = true;
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: order,
      message: "Order status successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.accept_order = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findById({
      _id: order_id,
      automatically_cancel_unaccepted_order_at: { $gt: Date.now() },
    });

    if (!order) {
      return next(new CustomError("Order acceptance time expired", 400));
    }

    order.status = "ongoingorders";
    order.current_order_status = "order_confirmed";
    order.stage = 2;
    order.automatically_cancel_unaccepted_order_at = null;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Order successfully accepted",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.reject_order = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const order = await Order.findById(order_id);

    if (!order) {
      return next(new CustomError("There is no order with this ID", 404));
    }

    order.automatically_cancel_unaccepted_order_at = null;
    order.stage = 0;
    // STAGE 1 MEANS ORDER GETS CANCELLED BEFORE IT GOT ACCEPTED BY RESTAURANT
    order.cancelled_stage = 1;
    order.status = "cancelled";
    order.current_order_status = "order_cancelled";
    order.cancelled = true;
    order.automatically_cancelled = false;
    order.reason_for_cancel = "Order rejected by the restaurant";
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Order successfully rejected",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
