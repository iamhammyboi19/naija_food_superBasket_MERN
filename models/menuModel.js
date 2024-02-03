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
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
    toppings: [toppingsSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// menuSchema.index({ restuarant: 1, menu_name: 1 }, { unique: true });

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
