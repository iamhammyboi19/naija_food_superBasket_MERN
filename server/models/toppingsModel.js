const mongoose = require("mongoose");
const slugify = require("slugify");

// toppings options eg pepsi, cocacola, fanta
const toppingsOptionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name for the toppings option"],
    lowercase: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
    min: [0, "Price can't be less than 0"],
  },
  slug: String,
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
      required: [true, "Please check if toppings is optional or mandatory"],
    },
    slug: String,
    options: [toppingsOptionsSchema],
    min_selection: { default: 1, type: Number },
    max_selection: { default: 1, type: Number },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

toppingsSchema.pre("save", function (next) {
  this.slug = slugify(this.toppings_name, {
    replacement: "_",
    lower: true,
    trim: true,
  });
  next();
});

toppingsOptionsSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    replacement: "_",
    lower: true,
    trim: true,
  });
  next();
});

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
