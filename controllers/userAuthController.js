/* eslint-disable operator-linebreak */
/* eslint-disable indent */
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const Email = require("../utils/email");
const { hash_token_exp, createToken } = require("../utils/reuseables");
const User = require("../models/userModel");

exports.signup_user = async (req, res, next) => {
  try {
    // take user details for signup and pass to the next middleware
    const {
      email_address,
      name,
      password,
      restaurant_name,
      business_reg_no,
      phone_number,
    } = req.body;

    // check if there is an existing user trying to signup
    const check_if_user_exists = await User.findOne({
      email_address: req.body.email_address,
    });
    if (check_if_user_exists) {
      return next(
        new CustomError(
          `Account with the email address <${req.body.email_address}> already exists`,
          400
        )
      );
    }

    const user =
      restaurant_name && business_reg_no
        ? await User.create({
            email_address,
            name,
            password,
            restaurant_name,
            business_reg_no,
            role: "restaurant",
            phone_number,
          })
        : // if there is no restaurant name and business registration number provided signup as user
          await User.create({
            email_address,
            name,
            password,
            role: "user",
            phone_number,
          });

    req.new_user = user;

    return next();
  } catch (err) {
    next(err);
  }
};

exports.verify_email_token = async (req, res, next) => {
  //
  try {
    const { token: v_token } = req.params;
    const hash = hash_token_exp(v_token);
    const user = await User.findOne({
      confirm_user_email_address_token: hash,
      confirm_email_token_expires_at: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new CustomError(
          "Token expired or used. Please request for a new email address verification token",
          401
        )
      );
    }

    user.confirm_user_email_address_token = undefined;
    user.confirm_email_token_expires_at = undefined;
    user.confirmed_user_email_address = true;
    await user.save({ validateBeforeSave: false });

    const token = await createToken(user._id);

    res.status(200).json({
      status: "success",
      message: "User email address verification successful",
      data: {
        user,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login_user = async (req, res, next) => {
  try {
    const { email_address, password } = req.body;

    if (!email_address || !password) {
      return next(
        new CustomError("Please provide your email and password", 400)
      );
    }

    // check user
    const user = await User.findOne({ email_address }).select("+password");

    //   if no user send an error message
    if (!user) {
      return next(
        new CustomError(
          `Incorrect email, username or password. Please try again`,
          400
        )
      );
    }

    if (user) {
      //   check if the user account is locked
      if (
        user.locked.unlock_at !== null &&
        Date.now() < user.locked.unlock_at
      ) {
        return next(
          new CustomError(
            `Too many failed attempts. Please try again in 20 mins`,
            401
          )
        );
      }

      // check if user trying to login confirmed email
      if (!user.confirmed_user_email_address) {
        return next(
          new CustomError(
            "Please verify your email address, check your email for verification token or click forgot password",
            407
          )
        );
      }

      if (!(await user.compare_password(password, user.password))) {
        user.locked.attempts = +user.locked.attempts + 1;

        //   if the attempts is max lock account and set unlock time and take the attempts back to 0
        // take attempt back to 0 so after unlock_at time expires new attempts is calculated
        if (user.locked.attempts === +process.env.LOGIN_ATTEMPTS) {
          user.locked.attempts = 0;
          user.locked.is_locked = true;
          user.locked.unlock_at =
            Date.now() + +process.env.LOGIN_UNLOCK_AT * 60 * 1000;
        }

        await user.save({ validateBeforeSave: false });

        // send how many attempts remaining and if it is 0 tell user too many failed attempts instead of 0 attempts remaining
        return next(
          new CustomError(
            `Invalid login credentials. ${
              user.locked.attempts === 0
                ? "Too many failed attempts. Please try again in 20 mins"
                : `${
                    +process.env.LOGIN_ATTEMPTS - user.locked.attempts
                  } attempts remaining`
            }`,
            401
          )
        );
      }

      // if login was successful take locked object back to default and save then send response and token
      user.locked.attempts = 0;
      user.locked.is_locked = false;
      user.locked.unlock_at = null;
      user.active = true;

      await user.save({ validateBeforeSave: false });

      const token = await createToken(user._id);

      // send cookie response
      // res.cookie("jwt", token, cookiesOptions);

      res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.protected_user = async (req, res, next) => {
  try {
    // check if there is token in req headers
    const user_token = req.headers.authorization?.split(" ")[1];
    // || req.cookies.jwt;

    //

    // console.log(req.cookies.jwt);
    if (!user_token) {
      return next(
        new CustomError(
          `Unauthorized access. Please login your account to access this page`,
          401
        )
      );
    }

    // check and verfiy user_token
    const user_verified = await promisify(jwt.verify)(
      user_token,
      process.env.JWT_SECRET
    );

    // find user with the id generated from verified token
    const user = await User.findById(user_verified.id);
    if (!user) {
      return next(
        new CustomError(`There is no user found with this token`, 404)
      );
    }

    // if the time token was created is less than the time password was changed throw error
    if (await user.verify_user_jwt_created_time(user_verified.iat)) {
      return next(
        new CustomError(
          `Your password was changed recently which makes your token invalid. Please login to get access. If you did not change your password please reset your password`,
          401
        )
      );
    }

    req.current_user = user;
    // res.locals.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// reset password route
exports.reset_password = async (req, res, next) => {
  try {
    const { resetpasswordtoken } = req.params;
    const { password } = req.body;

    if (!password) {
      return next(new CustomError("Please enter your password", 400));
    }

    // hash the token
    const hash_token = hash_token_exp(resetpasswordtoken);
    //
    // console.log(
    //   await User.findOne({ passwordResetToken: hash_token }),
    //   Date.now()
    // );
    const user = await User.findOne({
      password_reset_token: hash_token,
      password_reset_token_expires_at: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new CustomError(
          `Password reset token expired. Please request for a new password reset token`,
          400
        )
      );
    }

    user.password = password;
    user.password_reset_token = undefined;
    user.password_reset_token_expires_at = undefined;
    await user.save({ validateBeforeSave: true });

    const token = await createToken(user._id);

    // send cookie response
    // res.cookie("jwt", token, cookiesOptions);

    res.status(200).json({
      status: "success",
      message: "Password succesfully updated",
      token,
    });
  } catch (err) {
    next(err);
  }
};

// forgot password route
exports.forgot_password = async (req, res, next) => {
  try {
    const { email_address } = req.body;
    if (!email_address) {
      return next(
        new CustomError(
          `Please enter your email address to reset your password`,
          400
        )
      );
    }
    const user = await User.findOne({ email_address });
    if (!user) {
      return next(
        new CustomError(
          `There is no user with this email address. Please check again and input the correct email address`,
          404
        )
      );
    }
    const reset_pass_token = await user.reset_password_token();

    user.password_reset_token = hash_token_exp(reset_pass_token);
    user.password_reset_token_expires_at =
      Date.now() + +process.env.CONFIRM_TOKEN_EXPIRES_IN * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // const url = `${req.protocol}://${req.host}/confirm-user-account/${reset_pass_token}`;
    // const url = `http://127.0.0.1:3000/api/v1/users/resetpassword/${reset_pass_token}`;
    const url = `http://127.0.0.1:3000/resetpassword/${reset_pass_token}`;

    try {
      await new Email().sendResetPassword(
        user.email_address,
        "Token expires in 10mins",
        url
      );

      res.status(200).json({
        status: "success",
        message:
          "Password token sent successfully. Please check your email and reset your password",
      });
    } catch (err) {
      next(
        new CustomError(
          `Error sending password reset token, please try again later`,
          500
        )
      );
    }
  } catch (err) {
    next(err);
  }
};
