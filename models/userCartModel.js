const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: [true, "Cart item must have a name"],
    },
    item_quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, "Cart item must have a price"],
    },
    total_price: {
      type: Number,
      default: this.item_quantity * this.price,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
