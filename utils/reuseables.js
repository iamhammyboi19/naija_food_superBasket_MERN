const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
