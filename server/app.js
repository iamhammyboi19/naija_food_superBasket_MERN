const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const CustomError = require("./utils/CustomError");
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const reviewRoute = require("./routes/reviewRoute");
const errorController = require("./controllers/errorController");

const app = express();

// const whitelist = ["http://localhost:5173"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new CustomError("Not allowed by CORS", 401));
//     }
//   },
// };

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
//   optionSuccessStatus: 200,
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
// };

app.use(cookieParser());
app.use(cors("*"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));

app.use(morgan("dev"));

// app.get("/testing", async (req, res, next) => {
//   res.send({ data: "Checking info" });
// });

app.use("/api/v1/users", userRoute);
app.use("/api/v1/menus", menuRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);

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
