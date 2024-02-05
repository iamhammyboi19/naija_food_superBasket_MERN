const router = require("express").Router();
const menuController = require("../controllers/menuController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");
const { send_email_token } = require("../middlewares/send_email_token");
const multer_imgs_upload = require("../middlewares/multer_imgs_upload");

router.post("/signup", userAuthController.signup_user, send_email_token);
router.post("/login", userAuthController.login_user);
router.get("/signup/:token", userAuthController.verify_email_token);

module.exports = router;
