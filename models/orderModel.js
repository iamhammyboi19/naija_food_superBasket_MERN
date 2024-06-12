const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   restaurant: { type: mongoose.ObjectId, ref: "User" },
//   user: { type: mongoose.ObjectId, ref: "User" },
//   items_number: {
//     type: Number,
//     require: [true, "Order must have item numbers"],
//   },
//   address: { type: {}, require: [true, "Order must have delivery address"] },
//   total_price: {
//     type: Number,
//     require: [true, "Order must have item numbers"],
//   },
//   menu_details: {
//     type: Array,
//     required: [true, "Order must have menus purchased"],
//   },
// });
const orderSchema = new mongoose.Schema({
  order_data: {},
  restaurant: { type: mongoose.ObjectId, ref: "User" },
  user: { type: mongoose.ObjectId, ref: "User" },
  email: { type: String },
  phone_number: { type: String },
  createdAt: { type: Date, default: new Date(Date.now) },
  amount: { type: Number, required: true },
  paymentmethod: { type: String, default: "Card" },
  status: { type: String, default: "neworders" },
  current_order_status: { type: String, default: "order_placed" },
  automatically_cancel_unaccepted_order_at: { type: Date },
  cancelled: { type: Boolean, default: false },
  reason_for_cancel: { type: String, default: null },
  stage: { type: Number, default: 1 },
  cancelled_stage: { type: Number, default: null },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
