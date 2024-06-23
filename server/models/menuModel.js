const mongoose = require("mongoose");
const toppingsSchema = require("./toppingsModel");

const menuSchema = new mongoose.Schema(
  {
    menu_name: {
      type: String,
      required: [true, "Please provide menu name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide menu price"],
      min: [10, "Menu price must be at least 10"],
    },
    menu_image: {
      type: String,
      required: [true, "Please upload a picture of this menu"],
    },
    menu_desc: {
      type: String,
      required: [true, "Please give the menu a description eg ingredients"],
    },
    restaurant: { type: mongoose.ObjectId, ref: "User" },
    // restaurant_name: { type: String },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
    toppings: [toppingsSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

menuSchema.index(
  { restuarant: 1, menu_name: 1 },
  { unique: true, sparse: true }
);

// menuSchema.pre("save", function (next) {
//   const restructer_restaurant_name = this.restaurant_name
//     .split(" ")
//     .join("")
//     .toLowerCase();
//   this.restaurant_name = restructer_restaurant_name;
//   next();
// });

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
