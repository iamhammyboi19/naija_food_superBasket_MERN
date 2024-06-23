const mongoose = require("mongoose");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: [1, "Rating cannot be less than 1"],
      max: [5, "Rating cannot be greater than 5"],
    },
    restaurant: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "Review must be related to a restaurant"],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    menu: {
      type: mongoose.ObjectId,
      ref: "Menu",
      required: [true, "Review must belong to a menu"],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Please write a review"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.static("calcAverageReviews", async function (restaurant_id) {
  const stats = await this.aggregate([
    { $match: { restaurant: restaurant_id } },
    {
      $group: {
        _id: "$restaurant",
        ratings_total: { $sum: 1 },
        avg_ratings: { $avg: "$rating" },
      },
    },
  ]);

  //   avoid error when all users delete their reviews for instance as there would be empty aggregate results
  if (stats.length > 0) {
    await User.findByIdAndUpdate(
      restaurant_id,
      {
        ratingsQuantity: stats.at(0).ratings_total,
        ratingsAvg: stats.at(0).avg_ratings.toFixed(1),
      },
      { new: true }
    );
  } else {
    await User.findByIdAndUpdate(
      restaurant_id,
      {
        ratingsAvg: 4.5,
        ratingsQuantity: 0,
      },
      { new: true }
    );
  }
});

reviewSchema.index({ menu: 1, user: 1 }, { unique: true });

reviewSchema.post("save", function () {
  this.constructor.calcAverageReviews(this.restaurant);
});

reviewSchema.post(/^findOneAnd/, function (doc) {
  doc.constructor.calcAverageReviews(doc.restaurant);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
