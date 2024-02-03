const Menu = require("../models/menuModel");
const CustomError = require("../utils/CustomError");
const { filter_update_obj } = require("../utils/reuseables");

// only restaurant owner can create a menu
exports.create_menu = async (req, res, next) => {
  try {
    const { menu_name, price, menu_desc } = req.body;
    //
    const menu = await Menu.create({
      menu_desc,
      menu_name,
      menu_image: req.file_name,
      price,
      restaurant: req.current_user._id,
    });

    res.status(201).json({
      status: "success",
      menu,
      message: `Menu successfully created`,
    });
  } catch (err) {
    next(err);
  }
};

// update a menu
exports.update_menu = async (req, res, next) => {
  try {
    const { menu_id } = req.params;
    const update_fields = filter_update_obj(req.body, [
      "menu_name",
      "price",
      "menu_desc",
    ]);
    if (req.file) update_fields.menu_image = req.file_name;
    const menu = await Menu.findByIdAndUpdate(menu_id, update_fields, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Menu successfully updated",
      data: {
        menu,
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete a menu
exports.delete_menu = async (req, res, next) => {
  try {
    const { menu_id } = req.params;
    await Menu.findByIdAndDelete(menu_id);
    res.status(204).json({
      status: "success",
      message: "Menu successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

// add topppings to a menu
exports.add_toppings = async (req, res, next) => {
  try {
    const { menu_id: id } = req.params;
    const { toppings_name, compulsory } = req.body;
    const menu = await Menu.findById(id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    menu.toppings.push({ toppings_name, compulsory });
    await menu.save();
    res.status(200).json({
      status: "success",
      message: "Toppings successfully added to the menu",
      data: {
        menu,
      },
    });
  } catch (err) {
    next(err);
  }
};

// update menu toppings

// delete a menu toppings

// https://productsawsbucket.s3.eu-north-1.amazonaws.com/nfsB_images_1706966688714.jpeg
