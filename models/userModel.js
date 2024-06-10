const mongoose = require("mongoose");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const { phone } = require("phone");
const {
  // send_six_digits_code,
  generate_token_strings,
} = require("../utils/reuseables");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your fullname"],
      trim: true,
    },

    email_address: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.validate(value);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
      required: [true, "Please provide your email address"],
    },

    restaurant_name: {
      type: String,
      trim: true,
      lowercase: true,
      // unique: true,
      // sparse: true,
      index: { unique: true, sparse: true },
      required: function () {
        return this.role === "restaurant";
      },
    },

    service_type: {
      type: String,
      enum: {
        values: ["delivery", "pickup", "delivery and pickup"],
        message: (props) => `${props.value} is not a valid service type`,
      },
      required: function () {
        return this.role === "restaurant";
      },
    },

    menu_overview: {
      cover_photo: {
        type: String,
        default:
          "https://productsawsbucket.s3.eu-north-1.amazonaws.com/menuz.png",
      },
      delivery_fee: { type: Number, default: 0 },
      minimum_purchase: { type: Number, default: 0 },
      // Sunday - Saturday : 0 - 6
      open_day_start: { type: String, default: "1" },
      open_day_end: { type: String, default: "5" },
      open_hour: { type: String, default: "10:00" },
      close_hour: { type: String, default: "20:00" },
      open: { type: Boolean, default: false },
      // closed: { trype: Boolean, default: true },
    },

    business_reg_no: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "restaurant";
      },
    },

    // users can add multiple locations eg house address, work address
    location: [
      {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
          // required: true,
        },
        coordinate: {
          type: [Number],
          // required: [true, "Please provide your restuarant location"],
        },
        address: {
          suburb: String, // this would be auto generated with returned value after user provide lng, lat
          street_name: String,
          building_name: String,
          door_number: String,
          floor_number: String,
          direction: String,
        },
      },
    ],

    phone_number: {
      type: String,
      index: { unique: true, sparse: true },
      validate: {
        validator: function (val) {
          return phone(val).isValid;
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
      // required: [true, "Please provide your phone number"],
    },

    confirmed_user_email_address: { type: Boolean, default: false },
    confirmed_user_phone_number: { type: Boolean, default: false },
    confirm_user_email_address_token: String,
    confirm_user_phone_number_token: String,
    confirm_email_token_expires_at: Date,
    confirm_phone_token_expires_at: Date,
    email_changed_at: Date,
    active: {
      type: Boolean,
      default: true,
    },
    carts: {},
    role: {
      type: String,
      default: "user",
      enum: {
        values: ["user", "restaurant"],
        message: (props) =>
          `${props.value} is not a role, role can either be user or restaurant`,
      },
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    ratingsAvg: {
      type: Number,
      default: 4.5,
    },

    // locked account
    locked: {
      attempts: { type: Number, default: 0 },
      is_locked: { type: Boolean, default: false },
      unlock_at: { type: Date, default: null },
    },

    // inner auths
    password: {
      type: String,
      required: [true, "Please provide your password"],
      min: [8, "Password must be at least 8 characters"],
      select: false,
    },
    password_reset_token: String,
    password_reset_token_expires_at: Date,
    password_updated_at: Date,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// userSchema.path("phone_number").index({ sparse: true });

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "restaurant",
});

userSchema.virtual("menus", {
  ref: "Menu",
  localField: "_id",
  foreignField: "restaurant",
});

userSchema.static("check_if_open", async function (res_id) {
  //
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.password_updated_at = Date.now() - 1000;
  next();
});

// use to generate hash token for email verification
userSchema.method(
  "confirm_email_token",
  generate_token_strings(
    "confirm_user_email_address_token",
    "confirm_email_token_expires_at"
  )
);

// use to generate hash token for password reset
userSchema.method(
  "reset_password_token",
  generate_token_strings(
    "password_reset_token",
    "password_reset_token_expires_at"
  )
);

// use to generate 6 digits for phone number verification
// userSchema.method(
//   "confirm_phone_number",
//   send_six_digits_code("confirm_user_phone_number_token")
// );

//
userSchema.method(
  "compare_password",
  async function (inputted_password, user_password) {
    return await bcrypt.compare(inputted_password, user_password);
  }
);

// time password was changed should be less than time jwt token was generated
userSchema.method("verify_user_jwt_created_time", async function (jwt_time) {
  if (!this.password_updated_at) return;

  const pass_changed_time = parseInt(
    this.password_updated_at.getTime() / 1000,
    10
  );

  return pass_changed_time > jwt_time;
});

// changed password 1:11pm
// token time 1:02pm

const User = mongoose.model("User", userSchema);

module.exports = User;
