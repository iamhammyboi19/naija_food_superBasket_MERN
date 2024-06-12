/* eslint-disable indent */
/* eslint-disable multiline-ternary */
const User = require("../models/userModel");
const Menu = require("../models/menuModel");
const CustomError = require("../utils/CustomError");
const ApiFeatures = require("../utils/apiFeatures");
const { check_if_open } = require("../utils/reuseables");
// const { hash_token_exp } = require("../utils/reuseables");

exports.get_all_users = async (req, res, next) => {
  try {
    const doc = new ApiFeatures(
      User.find({ active: { $ne: false } }),
      req.query
    )
      .filter()
      .sort()
      .limit_selected_fields()
      .paginate();

    const users = await doc.query;

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
      results: users.length,
    });
  } catch (err) {
    next(err);
  }
};

exports.get_all_restaurants = async (req, res, next) => {
  try {
    console.log("req.query", req.query);
    const doc = new ApiFeatures(
      User.find({
        role: "restaurant",
      }),
      req.query
    )
      .filter()
      .sort()
      .limit_selected_fields()
      .paginate();

    const t_restaurants = await doc.query;

    // this is to check and update the open hour on every request
    const restaurants =
      t_restaurants?.length > 0
        ? t_restaurants.map((restaurant) => ({
            ...restaurant.toObject(),
            open:
              restaurant.menu_overview.open_hour &&
              restaurant.menu_overview.close_hour &&
              check_if_open(
                restaurant.menu_overview.open_hour,
                restaurant.menu_overview.close_hour,
                restaurant.menu_overview.open_day_start,
                restaurant.menu_overview.open_day_end
              ),
          }))
        : [];

    res
      .status(200)
      .json({ status: "success", restaurants, results: restaurants.length });
  } catch (err) {
    next(err);
  }
};

exports.get_restaurant = async (req, res, next) => {
  try {
    const { restaurant_id } = req.params;
    const t_restaurant = await User.findById(restaurant_id)
      .populate("reviews")
      .populate("menus");

    if (!t_restaurant || t_restaurant.active === false) {
      return res.status(200).json({
        status: "success",
        active_restaurant: false,
        message: "This restaurant doesn't exist or currently not active",
      });
    }

    // this is to check and update the open hour on every request
    const open =
      t_restaurant.menu_overview.open_hour &&
      t_restaurant.menu_overview.close_hour &&
      check_if_open(
        t_restaurant.menu_overview.open_hour,
        t_restaurant.menu_overview.close_hour,
        t_restaurant.menu_overview.open_day_start,
        t_restaurant.menu_overview.open_day_end
      );
    const restaurant = { ...t_restaurant.toObject(), open };

    res.status(200).json({
      status: "success",
      active_restaurant: true,
      data: {
        restaurant,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ADD MENU TO CART [takes quantity and toppings from req.body]
// increase or decrease cart quantity only when you already add to cart [only needs menu_id]

// add menu to cart
exports.add_product_to_cart = async (req, res, next) => {
  try {
    //
    const { menu_id } = req.params;
    const { quantity, toppings, note } = req.body;
    const user = req.current_user;

    // const query = req.query;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("Menu unavailable", 404));
    }

    // check if restaurant is open
    const t_restaurant = await User.findById(menu.restaurant);
    const open =
      t_restaurant.menu_overview.open_hour &&
      t_restaurant.menu_overview.close_hour &&
      check_if_open(
        t_restaurant.menu_overview.open_hour,
        t_restaurant.menu_overview.close_hour,
        t_restaurant.menu_overview.open_day_start,
        t_restaurant.menu_overview.open_day_end
      );

    if (!open) {
      return next(new CustomError("Restaurant is closed.", 400));
    }

    // check if menu already in cart
    const find_cart_item = user.carts?.filter((el) => el.id === menu_id);

    if (find_cart_item?.length > 0) {
      return next(new CustomError("Duplicate! Menu already in cart", 400));
    }

    // GET COMPULSORY TOPPINGS that's set to true AND CHECK IF THEY ARE SELECTED
    const compulsory_toppings = menu.toppings
      ?.map((el) => (el.compulsory === true ? el.slug : ""))
      .filter((el) => el !== "");

    // I want user to only add menus only from the same restaurant
    const check_different_menu_id =
      user.carts?.length > 0 &&
      user.carts?.filter(
        (el) => String(el.restaurant) !== String(menu.restaurant)
      );

    if (check_different_menu_id.length > 0) {
      return res.status(200).json({
        issue: true,
        status: "success",
        message: "You need to clear other restaurants menu from cart.",
      });
    }

    const tops = Object.keys(toppings);
    const opts = Object.values(toppings);

    // CHECK IF COMPULSORY TOPPINGS ARE IN QUERY
    let count = 0;
    const comp_items = [];
    compulsory_toppings.forEach((el) => {
      if (tops.includes(el) === false) {
        count = count + 1;
        comp_items.push(el.split("_").join(" "));
      }
    });
    if (count > 0) {
      return next(
        new CustomError(
          `The toppings ${comp_items.join(" ")} ${
            comp_items.length > 1 ? "are" : "is"
          } compulsory please select an option`,
          400
        )
      );
    }

    // filter toppings_name in tops
    const filter_tops = menu.toppings.filter((el) => tops.includes(el.slug));
    // first map get options from each toppings and second map finds opts from the query inside the toppings
    const filter_opts = filter_tops
      // el.options returns list of options
      .map((el) => el.options)
      // loop the list of options to take out the specific one you need
      .map((el2) => el2.find((el3) => opts.includes(el3.slug)));
    // get toppings_name:{options} like this
    const tops_opts_picked = {};
    let toppings_price = 0;
    if (filter_tops.length > 0) {
      filter_tops.forEach((el, index) => {
        tops_opts_picked[el.toppings_name] = filter_opts[index];
        toppings_price += filter_opts[index]?.price;
      });
      // tops_opts_picked.tops_price = toppings_price;
    }
    // reconstruct the menu before adding to cart
    const cart_menu = {
      ...menu.toObject(),
      toppings: tops_opts_picked,
      price: menu.price + toppings_price,
      note: note || "",
      quantity,
    };

    cart_menu.total_price = cart_menu.price * cart_menu.quantity;
    // user.carts = [];
    user.carts.push(cart_menu);
    user.markModified("carts");
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Menu successfully added to cart",
      data: {
        user,
      },
      numbers_of_products: user.carts.length,
      issue: false,
    });
  } catch (err) {
    next(err);
  }
};

exports.increase_products_in_cart = async (req, res, next) => {
  try {
    const { menu_id } = req.params;
    const user = req.current_user;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(
        new CustomError("Menu unavailable! Reload page or clear all carts", 404)
      );
    }

    const find_cart_item = user.carts?.filter((el) => el.id === menu_id)?.at(0);
    const useritems = user.carts;

    if (find_cart_item !== undefined) {
      find_cart_item.quantity += 1;
      find_cart_item.total_price =
        find_cart_item.price * find_cart_item.quantity;
      const item_index = user.carts.findIndex((el) => el.id === menu_id);
      useritems[item_index] = find_cart_item;
      user.carts = [];
      user.carts.push(...useritems);
      user.markModified("carts");
      await user.save({ validateBeforeSave: false });
    } else {
      return next(
        new CustomError("Menu unavailable! Reload page or clear all carts", 404)
      );
    }

    res.status(204).json({
      status: "success",
      message: "Menu successfully added to cart",
    });
  } catch (err) {
    next(err);
  }
};

exports.decrease_products_from_cart = async (req, res, next) => {
  try {
    //
    const { menu_id } = req.params;
    const user = req.current_user;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(
        new CustomError("Menu unavailable! Reload page or clear all carts", 404)
      );
    }

    const find_cart_item = user.carts?.filter((el) => el.id === menu_id)?.at(0);
    const useritems = user.carts;

    if (find_cart_item !== undefined) {
      // IF ONE QUANTITY REMOVE COMPLETELY FROM CART
      if (find_cart_item.quantity === 1) {
        //
        const remaining_items = useritems.filter((el) => el.id !== menu_id);
        user.carts = [];
        user.carts.push(...remaining_items);
        user.markModified("carts");
        await user.save({ validateBeforeSave: false });
        // IF MORE THAN ONE QUANTITY REDUCE QUANTITY TO ONE
      } else {
        find_cart_item.quantity -= 1;
        find_cart_item.total_price =
          find_cart_item.price * find_cart_item.quantity;
        const item_index = user.carts.findIndex((el) => el.id === menu_id);
        useritems[item_index] = find_cart_item;
        user.carts = [];
        user.carts.push(...useritems);
        user.markModified("carts");
        await user.save({ validateBeforeSave: false });
      }
    } else {
      return next(
        new CustomError("Menu unavailable! Reload page or clear all carts", 404)
      );
    }

    res.status(204).json({
      status: "success",
      message: "Menu successfully removed from cart",
    });
  } catch (err) {
    next(err);
  }
};

exports.remove_all_carts = async (req, res, next) => {
  try {
    const user = req.current_user;
    user.carts = [];
    user.markModified("carts");
    await user.save({ validateBeforeSave: false });
    res.status(204).json({
      status: "success",
      message: "Carts cleared successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.remove_cart = async (req, res, next) => {
  try {
    //
    const { menu_id } = req.params;
    const user = req.current_user;

    const find_cart_item = user.carts?.filter((el) => el.id === menu_id)?.at(0);
    const useritems = user.carts;

    if (find_cart_item !== undefined) {
      const remaining_items = useritems.filter((el) => el.id !== menu_id);
      user.carts = [];
      user.carts.push(...remaining_items);
      user.markModified("carts");
      await user.save({ validateBeforeSave: false });
    } else {
      return next(
        new CustomError("Menu unavailable! Reload page or clear all carts", 404)
      );
    }

    res.status(204).json({
      status: "success",
      message: "Menu successfully removed from cart",
    });
  } catch (err) {
    next(err);
  }
};

// take user from protected_user route middleware
exports.restrict_user = async (req, res, next) => {
  try {
    const user = req.current_user.role === "user";

    console.log("user", user);

    if (user) {
      return next(
        new CustomError(
          `User does not have permission to perform this action, kindly open a business account`,
          403
        )
      );
    }
    return next();
  } catch (err) {
    next(err);
  }
};

// take user from protected_user route middleware
exports.restrict_restaurant = async (req, res, next) => {
  try {
    const user = req.current_user.role === "restaurant";
    if (user) {
      return next(
        new CustomError(
          `Restaurant does not have permission to perform this action`,
          403
        )
      );
    }
    return next();
  } catch (err) {
    next(err);
  }
};

// update none auths user/restaurant details here
exports.update_user = async (req, res, next) => {
  try {
    //
    const user = req.current_user;
    let update_user;
    const {
      name,
      restaurant_name,
      service_type,
      business_reg_no,
      password,
      email_address,
      delivery_fee,
      minimum_purchase,
      open_day_start,
      open_day_end,
      open_hour,
      close_hour,
    } = req.body;

    if (password || email_address) {
      return next(
        new CustomError(
          "You cannot update your password or email address in this route",
          400
        )
      );
    }

    if (user.role === "user") {
      update_user = await User.findByIdAndUpdate(
        user._id,
        { name },
        { runValidators: true, new: true }
      );
    }

    if (user.role === "restaurant") {
      // update restaurant name separately
      if (name) {
        update_user = await User.findByIdAndUpdate(
          user._id,
          {
            name,
            restaurant_name,
            service_type,
            business_reg_no,
          },
          { runValidators: true, new: true }
        );
      }

      if (delivery_fee || minimum_purchase) {
        if (req.file) {
          user.menu_overview.cover_photo =
            process.env.IMAGE_UPLOAD_URL + req.file_name;
        }
        user.menu_overview.delivery_fee = delivery_fee;
        user.menu_overview.minimum_purchase = minimum_purchase;
        user.menu_overview.open_day_start = open_day_start;
        user.menu_overview.open_day_end = open_day_end;
        user.menu_overview.open_hour = open_hour;
        user.menu_overview.close_hour = close_hour;
        user.markModified("menu_overview");
        await user.save({ validateBeforeSave: false });
      }
    }

    res.status(200).json({
      status: "success",
      message: "User successfully updated",
      data: {
        user: update_user || user,
      },
    });
  } catch (err) {
    next(err);
  }
};
