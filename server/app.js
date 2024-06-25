const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const CustomError = require("./utils/CustomError");
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const reviewRoute = require("./routes/reviewRoute");
const errorController = require("./controllers/errorController");

const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

app.use(express.static(path.resolve(__dirname, "./public")));

// const whitelist = [
//   "http://localhost:5173",
//   "https://naija-food-super-basket-mern-frontend.vercel.app",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new CustomError("Not allowed by CORS", 401));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: [
//     "Access-Control-Allow-Origin",
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//   ],
//   credentials: true,
// };

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to naijaFoodSuperBasket");
});

// app.get("/testing", async (req, res, next) => {
//   res.send({ data: "Checking info" });
// });

app.use("/api/v1/users", userRoute);
app.use("/api/v1/menus", menuRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/reviews", reviewRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

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
