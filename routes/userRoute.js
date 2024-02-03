const router = require("express").Router();
const menuController = require("../controllers/menuController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");
const { send_email_token } = require("../middlewares/send_email_token");
const multer_imgs_upload = require("../middlewares/multer_imgs_upload");

router.post("/signup", userAuthController.signup_user, send_email_token);
router.post("/login", userAuthController.login_user);
router.get("/signup/:token", userAuthController.verify_email_token);
router.use(userAuthController.protected_user, userController.restrict_user);
router.post("/create_menu", multer_imgs_upload, menuController.create_menu);
router.post("/add_toppings/:menu_id", menuController.add_toppings);
// router.post("/update_menu/:menu_id")

module.exports = router;
