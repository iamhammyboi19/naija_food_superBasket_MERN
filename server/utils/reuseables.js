const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const { promisify } = require("util");

// generate 6 digit code and save hash to database
// token_name eg confirm_user_email_address_token
// token_expiry_time eg confirm_email_token_expires_at
exports.send_six_digits_code = function (token_name) {
  return async function () {
    const six_digits_code = await promisify(crypto.randomInt)(100000, 999999);
    const hash = hash_token(six_digits_code);
    this[token_name] = hash;
    return six_digits_code;
  };
};

// hash short time verification token before saving to database
const hash_token = (token) => {
  return crypto
    .createHash("sha256", process.env.CRYPTO_HASH_SECRET)
    .update(token)
    .digest("hex");
};

// generate 32bytes hex token code and save hash to database
// token_name eg confirm_user_email_address_token
// token_expiry_time eg confirm_email_token_expires_at
exports.generate_token_strings = function (token_name, token_expiry_time) {
  return async function () {
    const token = (await promisify(crypto.randomBytes)(32)).toString("hex");
    const hash = hash_token(token);
    this[token_name] = hash;
    this[token_expiry_time] =
      Date.now() + +process.env.CONFIRM_TOKEN_EXPIRES_IN * 60000;
    return token;
  };
};

exports.hash_token_exp = hash_token;

// create jwt tokens
exports.createToken = async (id) => {
  const generate_jwt = promisify(jwt.sign);
  return await generate_jwt(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// received_obj=req.body, fields_to_update=["name", "email"]
// if req.body comes with {name:"dave", email:"u@me.com", password:0123456789}
// then obj returns {name:"dave", email:"u@me.com"}
exports.filter_update_obj = (received_obj, fields_to_update) => {
  const obj = {};
  Object.keys(received_obj).forEach((el) => {
    if (fields_to_update.includes(el)) {
      obj[el] = received_obj[el];
    }
  });
  return obj;
};

exports.check_if_open = (
  open_hour,
  close_hour,
  open_day_start,
  open_day_end
) => {
  // get current time and extract year month and date
  const time = new Date(Date.now());
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  // check current day if it is in open day
  const theday = time.getDay();

  // take open and close time eg 10:00 17:00
  // split and extract hours and minute of the current date
  // use that to create everyday open and close hour
  const close = close_hour.split(":").map((el) => Number(el));
  const open = open_hour.split(":").map((el) => Number(el));
  const close_hours = new Date(year, month, day, close.at(0), close.at(1));
  const open_hours = new Date(year, month, day, open.at(0), open.at(1));

  // use moment to check if open and close hour is active ie
  // open hour must always be less than current time
  // && closing hour must always be greater than current time
  // current day must be within range of open days
  const current_time = moment(time);
  const closing_time = moment(close_hours);
  const opening_time = moment(open_hours);

  if (
    closing_time.diff(current_time, "seconds") > 1 &&
    current_time.diff(opening_time, "seconds") > 1 &&
    theday >= Number(open_day_start) &&
    theday <= Number(open_day_end)
  ) {
    return true;
  } else {
    return false;
  }
};
