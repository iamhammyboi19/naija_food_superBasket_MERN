const router = require("express").Router();
const locationController = require("../controllers/locationController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");
const multer_imgs_upload = require("../middlewares/multer_imgs_upload");
const { send_email_token } = require("../middlewares/send_email_token");
// const multer_imgs_upload = require("../middlewares/multer_imgs_upload");

router.post(
  "/signup",
  userAuthController.signup_user,
  send_email_token("signup")
);
router.post("/login", userAuthController.login_user);
router.get("/signup/:token", userAuthController.verify_email_token);
router.patch("/reset_password/:token", userAuthController.reset_password);
router.post("/forgot_password", userAuthController.forgot_password);
router.get("/update_email/:token", userAuthController.verify_email_token);
router.get("/authuser", userAuthController.protected_user_frontend);

router.use(userAuthController.protected_user);
router.get("/allusers", userController.get_all_users);
router.get("/restaurants", userController.get_all_restaurants);
router.post("/location", locationController.add_user_location_manually);
router.get("/restaurants/:restaurant_id", userController.get_restaurant);
router
  .route("/location/:id")
  .get(locationController.get_user_address)
  .patch(locationController.update_user_address)
  .delete(locationController.delete_user_address);
router.patch(
  "/update_email",
  userAuthController.update_email_address,
  send_email_token("update_email")
);
router.patch("/update_me", multer_imgs_upload, userController.update_user);
router.patch("/update_password", userAuthController.update_password);

router
  .route("/logout")
  .delete(userAuthController.protected_user, userAuthController.logout_user);

module.exports = router;
// Guaranty+Trust+Bank+Olowora+Lagos/@6.6370035,3.3713582
// 750m
/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmEzZjkxNDliZjQ5MzU3NDAzY2U4OSIsImlhdCI6MTcwODAzOTE4NSwiZXhwIjoxNzE1ODE1MTg1fQ.brvzjB2E1hlmWcOOwZZwWzk1wWGc2Wie42zy7HQc9NQ
*/
