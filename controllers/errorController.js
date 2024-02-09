const CustomError = require("../utils/CustomError");

function handle_duplicate_field(err) {
  // check error for duplicate fields
  const duplicate_val = Object.entries(err.keyValue).map(
    (el) => `${el[0]} <${String(el[1]).replace("null", "")}> already exists`
  );
  const message =
    duplicate_val.length > 1 ? duplicate_val.join(" and ") : duplicate_val[0];
  return new CustomError(`Duplicate fields ${message} `, 409);
}

function handle_validation_error(err) {
  return new CustomError(err.message, 403);
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // check if it's in development
  if (process.env.NODE_ENV === "development") {
    // check if error is from the api route itself
    if (req.originalUrl.startsWith("/api")) {
      // check if it is operational error
      if (err.isOperational) {
        console.log(err.stack);
        res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
        // check if it is NOT operational error
      } else {
        console.log(err);
        console.log("err status", err.code);
        res.status(err.statusCode).json({
          status: "fail",
          message: err.message,
          err,
        });
      }
      // probably a wrong route or a frontend rendering for example pug template
      // USE THIS FOR RENDERING THE ERROR eg USING PUG TEMPLATE
      // THIS PART FOR NOW IS NOT SO USEFUL BUT INCASE I WANNA DO A SERVER RENDERING WITH PUG TEMPLATE I WILL JUST REIMPLEMENT IT
    } else {
      res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
        err,
      });
    }
    // handle error in development
  } else {
    send_production_error(err, req, res, next);
  }
};

function send_production_error(err, req, res, next) {
  //
  let error = { ...err };
  if (error.code === 11000) {
    error = handle_duplicate_field(error);
  }
  if (error.name === "ValidationError") {
    error = handle_validation_error(error);
  }

  // check if error is from the api route itself
  if (req.originalUrl.startsWith("/api")) {
    // check if it is operational error
    if (error.isOperational) {
      console.log(error);
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
      // check if it is NOT operational error
    } else {
      console.log(error);
      console.log("error status", error.code);
      res.status(error.statusCode).json({
        status: "fail",
        message: "Ooops something went wrong",
      });
    }
    // USE THIS FOR RENDERING THE ERROR eg USING PUG TEMPLATE
    // THIS PART FOR NOW IS NOT SO USEFUL BUT INCASE I WANNA DO A SERVER RENDERING WITH PUG TEMPLATE I WILL JUST REIMPLEMENT IT
  } else {
    // check if it is operational error
    if (error.isOperational) {
      console.log(error.stack);
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
      // check if it is NOT operational error
    } else {
      console.log(error);
      console.log("error status", error.code);
      res.status(error.statusCode).json({
        status: "fail",
        message: "Ooops something went wrong",
      });
    }
  }
}
