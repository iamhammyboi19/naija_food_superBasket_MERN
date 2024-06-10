const Review = require("../models/reviewModel");
const Menu = require("../models/menuModel");
const CustomError = require("../utils/CustomError");
const { filter_update_obj } = require("../utils/reuseables");

exports.createReview = async (req, res, next) => {
  try {
    const user = req.current_user;
    const { menu_id } = req.params;
    const { rating, comment } = req.body;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("There's no menu found with this id", 404));
    }

    const review = await Review.create({
      user: user._id,
      menu: menu_id,
      restaurant: menu.restaurant,
      rating,
      comment,
    });

    res.status(200).json({
      status: "success",
      message: "Review successfully created",
      data: { review },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const user = req.current_user;
    const review = await Review.findById(review_id);
    const filters = filter_update_obj(req.body, ["rating", "comment"]);

    if (!review) {
      return next(
        new CustomError("There is no review found with this ID", 404)
      );
    }

    if (String(user._id) !== String(review.user)) {
      return next(new CustomError("You can only edit your review", 400));
    }

    const updated_review = await Review.findByIdAndUpdate(review_id, filters, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Review successfully updated",
      data: { review: updated_review },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSpecificReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await Review.findById(review_id).populate("user");

    if (!review) {
      return next(
        new CustomError("There is no review found with this ID", 404)
      );
    }

    res.status(200).json({ status: "success", review });
  } catch (err) {
    next(err);
  }
};

exports.deleteOneReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const user = req.current_user;
    const review = await Review.findById(review_id);

    if (!review) {
      return next(
        new CustomError("There is no review found with this ID", 404)
      );
    }

    if (String(user._id) !== String(review.user)) {
      return next(new CustomError("You can only delete your review", 400));
    }
    await Review.findByIdAndDelete(review_id);

    res
      .status(204)
      .json({ status: "success", message: "Review successfully deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getSpecificRestaurantReviews = async (req, res, next) => {
  try {
    const { restaurant_id } = req.params;
    const reviews = await Review.find({ restaurant: restaurant_id });

    res
      .status(200)
      .json({ status: "success", results: reviews.length, reviews });
  } catch (err) {
    next(err);
  }
};
