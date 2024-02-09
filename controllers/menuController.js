const Menu = require("../models/menuModel");
const CustomError = require("../utils/CustomError");
const { filter_update_obj } = require("../utils/reuseables");

// const x = 100;

// only restaurant owner can create a menu
exports.create_menu = async (req, res, next) => {
  try {
    const { menu_name, price, menu_desc } = req.body;
    // CREATE A MENU
    const menu = await Menu.create({
      menu_desc,
      menu_name,
      menu_image: process.env.IMAGE_UPLOAD_URL + req.file_name,
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

// get menu
exports.get_specific_menu = async (req, res, next) => {
  try {
    const { menu_id } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(
        new CustomError(
          "This menu is either unavailable or deleted, please check your menu list and try again",
          404
        )
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        menu,
      },
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
    if (req.file) {
      update_fields.menu_image = process.env.IMAGE_UPLOAD_URL + req.file_name;
    }
    const menu = await Menu.findByIdAndUpdate(menu_id, update_fields, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      return next(
        new CustomError(
          "This menu is either unavailable or deleted, please check your menu list and try again",
          404
        )
      );
    }
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
    const menu = await Menu.findByIdAndDelete(menu_id);
    if (!menu) {
      return next(
        new CustomError("The menu you are trying to delete doesn't exist", 404)
      );
    }
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
    // check toppings name for duplicate
    let count = 0;
    menu.toppings.forEach((el) => {
      if (el.toppings_name === toppings_name.toLowerCase()) {
        count++;
      }
    });

    if (count > 0) {
      return next(
        new CustomError(
          `Duplicate fields ${toppings_name} toppings already exists for menu`,
          400
        )
      );
    } else {
      menu.toppings.push({ toppings_name, compulsory });
      await menu.save();
      res.status(200).json({
        status: "success",
        message: `${toppings_name} successfully added to the menu`,
        data: {
          menu,
        },
      });
    }
    //
  } catch (err) {
    next(err);
  }
};

// get specific menu toppings
exports.get_specific_menu_toppings = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError("There is no menu toppings with this id", 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        toppings,
      },
    });
  } catch (err) {
    next(err);
  }
};

// update menu toppings
exports.update_menu_toppings = async (req, res, next) => {
  try {
    //
    const { menu_id, toppings_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug
            .split("_")
            .join(" ")}`,
          404
        )
      );
    }
    const update_fields = filter_update_obj(req.body, [
      "toppings_name",
      "compulsory",
    ]);
    toppings.set(update_fields);
    await menu.save();
    res.status(200).json({
      status: "success",
      message: `${toppings.toppings_name} successfully updated`,
      data: {
        menu,
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete a menu toppings
exports.delete_menu_toppings = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug
            .split("_")
            .join(" ")}`,
          404
        )
      );
    }
    toppings.deleteOne();
    await menu.save();
    res.status(204).json({
      status: "success",
      message: "Menu toppings successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};

// add toppings to menu
exports.add_options_to_toppings = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug } = req.params;
    const { name, price } = req.body;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug
            .split("_")
            .join(" ")}`,
          404
        )
      );
    }

    // check for duplicate option name
    let count = 0;
    toppings.options.forEach((el) => {
      if (el.name === name.toLowerCase()) {
        count++;
      }
    });

    // there a option name with the one from req.body
    if (count > 0) {
      return next(
        new CustomError(
          `Duplicate field there is an option with the name ${name} for ${toppings_slug
            .split("_")
            .join(" ")}`
        )
      );
    } else {
      toppings.options.push({ name, price });
      await menu.save();
      res.status(200).json({
        status: "success",
        message: `${name} successfully added to ${toppings.toppings_name}`,
        data: {
          menu,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.get_toppings_opt = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug, option_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings_found = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);

    if (!toppings_found) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug}`,
          404
        )
      );
    }
    const option = toppings_found.options
      .filter((el) => el.slug === option_slug)
      .at(0);

    if (!option) {
      return next(
        new CustomError(
          `No option found with the name ${option_slug.split("_").join(" ")}`,
          404
        )
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        option,
      },
    });
  } catch (err) {
    next(err);
  }
};

// update menu toppings option
exports.update_toppings_opt = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug, option_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug
            .split("_")
            .join(" ")}`,
          404
        )
      );
    }
    const option = toppings.options
      .filter((el) => el.slug === option_slug)
      .at(0);
    if (!option) {
      return next(
        new CustomError(
          `No option found with the name ${option_slug.split("_").join(" ")}`,
          404
        )
      );
    }
    const update_fields = filter_update_obj(req.body, ["name", "price"]);
    option.set(update_fields);
    await menu.save();
    res.status(200).json({
      status: "success",
      message: `${option.name} successfully updated`,
      data: {
        menu,
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete menu toppings option
exports.delete_toppings_opt = async (req, res, next) => {
  try {
    const { menu_id, toppings_slug, option_slug } = req.params;
    const menu = await Menu.findById(menu_id);
    if (!menu) {
      return next(new CustomError("No menu found with this id", 404));
    }
    const toppings = menu.toppings
      .filter((el) => el.slug === toppings_slug)
      .at(0);
    if (!toppings) {
      return next(
        new CustomError(
          `There is no menu toppings with the name ${toppings_slug
            .split("_")
            .join(" ")}`,
          404
        )
      );
    }
    const option = toppings.options
      .filter((el) => el.slug === option_slug)
      .at(0);
    if (!option) {
      return next(
        new CustomError(
          `No option found with the name ${option_slug.split("_").join(" ")}`,
          404
        )
      );
    }
    option.deleteOne();
    await menu.save();
    res.status(204).json({
      status: "success",
      message: `Toppings option successfully deleted`,
      data: {
        menu,
      },
    });
  } catch (err) {
    next(err);
  }
};

/*

 menu_id and toppings_name, toppings_name params should be derived from toppings.slug e.g soft drinks should be /api/v1/menus/add_toppings/menu_id/soft_drinks
*/
