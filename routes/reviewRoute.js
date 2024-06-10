const router = require("express").Router();
// const userAuthController = require("../controllers/userAuthController");
// const userController = require("../controllers/userController");
const reviewController = require("../controllers/ReviewController");

// router.use(userAuthController.protected_user);

router.get(
  "/restaurant/:restaurant_id",
  reviewController.getSpecificRestaurantReviews
);

// router.use(userController.restrict_restaurant);

router.post("/:menu_id", reviewController.createReview);

router
  .route("/:review_id")
  .get(reviewController.getSpecificReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteOneReview);

module.exports = router;
