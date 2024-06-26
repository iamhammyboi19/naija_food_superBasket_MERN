const CustomError = require("../utils/CustomError");
const User = require("../models/userModel");
const Email = require("../utils/email");

// use for next middleware after signup or resending email token
// can also be used to resend email token to user
// user is either passed from the signup req.new_user OR inputted manually i.e email_address
exports.send_email_token = (token_name) => async (req, res, next) => {
  try {
    // take user from middleware
    let user;
    user = req.new_user || req.current_user;
    const { email_address } = req.body || req.new_user || req.current_user;

    // if no user found try and get user through email address
    // if no user found regardless throw 404 error
    if (!user) {
      user = await User.find({ email_address });
      if (!user) {
        return next(
          new CustomError(
            `No account found with this email address <${email_address}>`,
            404
          )
        );
      }
    }

    // generate token
    const email_token = await user.confirm_email_token();

    // token url to be sent to email
    // const url = `${req.protocol}://${req.get("host")}${
    //   req.originalUrl
    // }/${email_token}`;

    let url;
    let host;

    if (process.env.NODE_ENV === "production") {
      host = "https://naija-food-superbasket-mern.onrender.com";
    } else {
      host = "http://localhost:5173";
    }

    if (token_name === "signup") {
      url = `${host}/confirmtoken/${email_token}`;
    } else if (token_name === "reset_password") {
      url = `${host}/resetpassword/${email_token}`;
    } else if (token_name === "update_email") {
      url = `${host}/update_email/${email_token}`;
    }

    // send email verification
    try {
      await new Email().sendAccountConfirmationMessage(
        user.email_address,
        "Please verify your account email address",
        url
      );
    } catch (err) {
      console.log("send_email_token_err", err);
      next(
        new CustomError(
          `Error sending email verification token, please try again later`,
          500
        )
      );
    }
    // if email is sent save the user details
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Please verify your email address to proceed",
    });
  } catch (err) {
    next(err);
  }
};
