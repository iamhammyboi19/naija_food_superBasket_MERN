const CustomError = require("../utils/CustomError");

exports.add_user_location_manually = async (req, res, next) => {
  try {
    //
    const user = req.current_user;
    if (user.role === "restaurant" && user.location.length > 0) {
      return next(
        new CustomError(
          "Restaurants can only have one location, please contact us if you want to make an enquiry",
          400
        )
      );
    }
    user.location = [];
    user.location.push(req.body);
    user.markModified("location");
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Address successfully updated",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.get_user_address = async (req, res, next) => {
  try {
    //
    const user = req.current_user;
    const { id } = req.params;
    const find_the_address = user.location.id(id);
    if (!find_the_address) {
      return next(
        new CustomError("There is no address found with this ID", 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        address: find_the_address,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.update_user_address = async (req, res, next) => {
  try {
    //
    const user = req.current_user;
    const { id } = req.params;
    const find_the_address = user.location.id(id);
    if (!find_the_address) {
      return next(
        new CustomError("There is no address found with this ID", 404)
      );
    }
    find_the_address.set(req.body);
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Address successfully updated",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.delete_user_address = async (req, res, next) => {
  try {
    //
    const user = req.current_user;
    const { id } = req.params;
    const find_the_address = user.location.id(id);
    if (!find_the_address) {
      return next(
        new CustomError("There is no address found with this ID", 404)
      );
    }
    find_the_address.deleteOne();
    await user.save();
    res.status(204).json({
      status: "success",
      message: "User address successfully delete",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// CHECK USER LOCATION BEFORE ORDER
exports.check_user_location = async (req, res, next) => {
  try {
    //
    const user = req.current_user;

    //   check if the user have an address
    if (user.location.length === 0) {
      return next(
        new CustomError("Please add your location address to continue", 400)
      );
    }

    // check if each location have a coordinate
    let count = 0;
    const store_indexes = [];
    user.location.forEach((el, index) => {
      if (user.location.at(index).coordinate.length === 0) {
        count = el + 1;
        store_indexes.push(el + 1);
      }
    });

    if (count > 0) {
      return next(
        new CustomError(
          `Please add your location address coordinate to location at number ${store_indexes.join(
            " "
          )} to continue`,
          400
        )
      );
    }

    // check is user each location have Street name, building name, door number and floor number
    let address_info_count = 0;
    const store_indexes_info = [];
    user.location.forEach((el, index) => {
      if (
        !user.location.at(index).address.street_name ||
        !user.location.at(index).address.building_name ||
        !user.location.at(index).address.door_number ||
        !user.location.at(index).address.floor_number
      ) {
        address_info_count = el + 1;
        store_indexes_info.push(el + 1);
      }
    });

    if (address_info_count > 0) {
      return next(
        new CustomError(
          `Street name, building name, door number(add nil if no door number) and floor number are required for address at number ${store_indexes_info.join(
            " "
          )}`,
          400
        )
      );
    }
  } catch (err) {
    next(err);
  }
};

exports.sendifokay = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Hmmmm i guess everything is okay",
    });
  } catch (err) {
    next(err);
  }
};
