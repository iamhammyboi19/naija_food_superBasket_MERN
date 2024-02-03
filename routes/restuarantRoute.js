const router = require("express").Router();
const menuController = require("../controllers/menuController");

router.post("/create_menu", menuController.create_menu);
