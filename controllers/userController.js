const User = require("../models/userModel");
const CustomError = require("../utils/CustomError");
const ApiFeatures = require("../utils/apiFeatures");

exports.get_all_users = async (req, res, next) => {
  try {
    const users = await ApiFeatures(User, req.query);
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

exports.add_product_to_cart = async (req, res, next) => {
  try {
    //
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
