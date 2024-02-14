const express = require("express");
const morgan = require("morgan");
const CustomError = require("./utils/CustomError");
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");
const cartRoute = require("./routes/cartRoute");
const errorController = require("./controllers/errorController");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

app.use(morgan("dev"));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/menus", menuRoute);
app.use("/api/v1/carts", cartRoute);

app.all("*", (req, res, next) => {
  return next(
    new CustomError(
      `Sorry this route ${req.protocol}://${req.get("host")}${
        req.originalUrl
      } doesn't exist`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
