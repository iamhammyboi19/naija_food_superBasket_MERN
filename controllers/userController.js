const User = require("../models/userModel");
const CustomError = require("../utils/CustomError");
const ApiFeatures = require("../utils/apiFeatures");

// const p = 100;

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

/*
10000 meters is 15mins drive
1000 meters is 1.5mins drive

https://www.google.com/maps/place/WestGate+Life+Care/@6.6354826,3.3721295,17z/data=!3m1!4b1!4m6!3m5!1s0x103b933c80e55181:0xaa35162bafe00a1!8m2!3d6.6354773!4d3.3747044!16s%2Fg%2F11hz_3r1m_?entry=ttu

https://www.google.com/maps/place/Guaranty+Trust+Bank+Olowora+Lagos/@6.6365493,3.3730715,17z/data=!4m14!1m7!3m6!1s0x103b939ec7bcc82d:0x355c2bf6899a372d!2sWestgate+Lifecare+Supermarket!8m2!3d6.6351053!4d3.3749812!16s%2Fg%2F11fy15qhkt!3m5!1s0x103b939bf08e04db:0x2afbc764ae1989c4!8m2!3d6.6369982!4d3.3739331!16s%2Fg%2F11cs6f5349?entry=ttu

*/
// https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=

// https://maps.googleapis.com/maps/api/geocode/json?address=lekki phase 2&key=

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=

// https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters
/*
https://maps.googleapis.com/maps/api/place/autocomplete/json
  ?input=amoeba
  &location=37.76999%2C-122.44696
  &radius=500
  &types=establishment
  &key=YOUR_API_KEY
*/
