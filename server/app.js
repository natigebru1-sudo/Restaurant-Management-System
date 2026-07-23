const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = ["http://localhost:3000"];
      callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later" },
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, please try again later" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/", apiLimiter);

const { initDB } = require("./config/db");
const AuthRoute = require("./Routes/authRoute");
const IngredientsRoute = require("./Routes/ingredientsRoute");
const MenuItemIngredientRoute = require("./Routes/menuItemIngredientRoute");
const MenuItemRoute = require("./Routes/menuItemRoute");
const OrderItemRoute = require("./Routes/orderItemRoute");
const OrderRoute = require("./Routes/orderRoutes");
const PaymentRoute = require("./Routes/paymentRoute");
const ReservationRoute = require("./Routes/reservationRoutes");
const StaffScheduleRoute = require("./Routes/staffScheduleRoute");
const TableRoute = require("./Routes/tableRoute");
const UserRoute = require("./Routes/userRoute");

app.use("/api/auth", AuthRoute);
app.use("/api/ingredient", IngredientsRoute);
app.use("api/menu-ingredient", MenuItemIngredientRoute);
app.use("/api/menu-item", MenuItemRoute);
app.use("/api/order-item", OrderItemRoute);
app.use("/api/order", OrderRoute);
app.use("/api/payment", PaymentRoute);
app.use("/api/reservation", ReservationRoute);
app.use("/api/staff-schedule", StaffScheduleRoute);
app.use("/api/table", TableRoute);
app.use("/api/user", UserRoute);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Restaurant API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

if (require.main === module) {
  const startServer = async () => {
    try {
      await initDB();
      app.listen(PORT, () => {
        console.log("Restaurant management system is running");
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  };

  startServer();
}
