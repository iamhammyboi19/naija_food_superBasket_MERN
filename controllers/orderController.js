const Order = require("../models/orderModel");
const CustomError = require("../utils/CustomError");
const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

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
