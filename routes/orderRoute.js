const router = require("express").Router();
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");

router.use(userAuthController.protected_user);

router.post("/checkout-session", userController.restrict_restaurant);
router.get(
  "/paystack_check-session",
  userController.restrict_restaurant,
  orderController.order_paystack_payment
);
router.get("/", orderController.get_all_orders);
// router.route("/checkout-session");

module.exports = router;
