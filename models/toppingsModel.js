const mongoose = require("mongoose");

// toppings options eg pepsi, cocacola, fanta
const toppingsOptionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name for the toppings option"],
    lowercase: true,
  },
  price: {
    type: Number,
    default: 0,
    min: [0, "Price can't be less than 0"],
  },
});

// restuarants can add multiple toppings to a menu
// toppings must be linked to a specific menu
const toppingsSchema = new mongoose.Schema(
  {
    toppings_name: {
      type: String,
      required: [true, "Toppings must have a name"],
      trim: true,
      lowercase: true,
    },
    compulsory: {
      type: Boolean,
      required: [true, "Please check if toppings is compulsory or not"],
    },
    options: [toppingsOptionsSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = toppingsSchema;

/* {
  topping_name: "drinks",
  compulsory: true,
  options: [
    { name: "Pepsi", price: 0 },
    { name: "Fanta", price: 0 },
    { name: "Mirinda", price: 0 },
  ],
  price: 0,
};
*/
