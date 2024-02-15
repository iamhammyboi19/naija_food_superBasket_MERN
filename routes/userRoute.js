const router = require("express").Router();
const locationController = require("../controllers/locationController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");
const { send_email_token } = require("../middlewares/send_email_token");
// const multer_imgs_upload = require("../middlewares/multer_imgs_upload");

router.post("/signup", userAuthController.signup_user, send_email_token);
router.post("/login", userAuthController.login_user);
router.get("/signup/:token", userAuthController.verify_email_token);
router.patch("/reset_password/:token", userAuthController.reset_password);
router.post("/forgot_password", userAuthController.forgot_password);
router.get("/update_email/:token", userAuthController.verify_email_token);
router.use(userAuthController.protected_user);
router.post("/location", locationController.add_user_location_manually);
router
  .route("/location/:id")
  .get(locationController.get_user_address)
  .patch(locationController.update_user_address)
  .delete(locationController.delete_user_address);
router.patch(
  "/update_email",
  userAuthController.update_email_address,
  send_email_token
);
router.patch("/update_me", userController.update_user);

module.exports = router;
// Guaranty+Trust+Bank+Olowora+Lagos/@6.6370035,3.3713582
// 750m
