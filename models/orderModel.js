const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.ObjectId, ref: "User" },
  user: { type: mongoose.ObjectId, ref: "User" },
  items_number: {
    type: Number,
    require: [true, "Order must have item numbers"],
  },
  address: { type: {}, require: [true, "Order must have delivery address"] },
  total_price: {
    type: Number,
    require: [true, "Order must have item numbers"],
  },
  menu_details: {
    type: Array,
    required: [true, "Order must have menus purchased"],
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
