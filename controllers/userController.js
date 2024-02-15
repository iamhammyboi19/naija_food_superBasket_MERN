const User = require("../models/userModel");
const Menu = require("../models/menuModel");
const CustomError = require("../utils/CustomError");
const ApiFeatures = require("../utils/apiFeatures");
// const { hash_token_exp } = require("../utils/reuseables");

exports.get_all_users = async (req, res, next) => {
  try {
    const users = await ApiFeatures(
      User.find({ active: { $ne: false } }),
      req.query
    )
      .filter()
      .sort()
      .limit_selected_fields()
      .paginate();
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

exports.get_user = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById({ id: user_id });
    if (user.active === false) {
      return next(
        new CustomError(
          "Your account has been deleted, please login to retrieve your account",
          400
        )
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// add menu to cart
exports.add_product_to_cart = async (req, res, next) => {
  try {
    //
    const { menu_id } = req.params;
    const user = req.current_user;

    const query = req.query;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("Menu unavailable", 404));
    }

    // GET COMPULSORY TOPPINGS that's set to true AND CHECK IF THEY ARE SELECTED
    const compulsory_toppings = menu.toppings
      ?.map((el) => (el.compulsory === true ? el.slug : ""))
      .filter((el) => el !== "");

    const find_cart_item = user.carts?.filter((el) => el.id === menu_id)?.at(0);

    // if there is same menu in cart already increment menu
    if (find_cart_item !== undefined || find_cart_item?.length > 0) {
      find_cart_item.quantity += 1;
      find_cart_item.total_price =
        find_cart_item.price * find_cart_item.quantity;
      const item_index = user.carts.findIndex((el) => el.id === menu_id);
      const useritems = user.carts;
      useritems[item_index] = find_cart_item;
      user.carts = [];
      user.carts.push(...useritems);
      user.markModified("carts");
      await user.save({ validateBeforeSave: false });
      // if the menu is not in cart before add new item to the cart
    } else {
      // take queries and convert to array objects so you can filter them out eg
      // ?extra_proteinn=goat_meat&drinks=fanta
      // tops = [extra_proteinn, drinks]
      // opts = [goat_meat, fanta]
      const tops = Object.keys(query);
      const opts = Object.values(query);

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
        quantity: 1,
      };
      cart_menu.total_price = cart_menu.price * cart_menu.quantity;
      user.carts = [];
      user.carts.push(cart_menu);
      user.markModified("carts");
      await user.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      status: "success",
      message: "Menu successfully added to cart",
      data: {
        user,
      },
      numbers_of_products: user.carts.length,
    });
  } catch (err) {
    next(err);
  }
};

exports.remove_products_from_cart = async (req, res, next) => {
  try {
    //
    const { menu_id } = req.params;
    const user = req.current_user;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(
        new CustomError(
          "Menu unavailable! Click on clear all carts if you are unable to delete a menu",
          404
        )
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
        new CustomError(
          "There is no item with this menu ID in your cart. If this menu is still showing in your cart clear all carts",
          404
        )
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
    await user.save({ validateBeforeSave: false });
    res.status(204).json({
      status: "success",
      message: "Carts cleared successfully",
    });
  } catch (err) {
    next(err);
  }
};

// take user from protected_user route middleware
exports.restrict_user = async (req, res, next) => {
  try {
    const user = req.current_user.role === "user";

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
        user.id,
        { name },
        { runValidators: true, new: true }
      );
    }
    if (user.role === "restaurant") {
      update_user = await User.findByIdAndUpdate(user.id, {
        name,
        restaurant_name,
        service_type,
        business_reg_no,
      });
    }
    res.status(200).json({
      status: "success",
      message: "User successfully updated",
      data: {
        user: update_user,
      },
    });
  } catch (err) {
    next(err);
  }
};
