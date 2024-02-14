const router = require("express").Router();
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");

// middleware to make sure only user can perform operation -> restaurants can't add products to cart
router.use(
  userAuthController.protected_user,
  userController.restrict_restaurant
);

router
  .route("/:menu_id")
  .post(userController.add_product_to_cart)
  .delete(userController.remove_products_from_cart);
router.delete("/", userController.remove_all_carts);

module.exports = router;
