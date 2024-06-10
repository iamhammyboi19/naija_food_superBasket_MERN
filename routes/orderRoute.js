const router = require("express").Router();
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");

router.use(userAuthController.protected_user);

router.post("/checkout-session", userController.restrict_restaurant);
// router.route("/checkout-session");

module.exports = router;
