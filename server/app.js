const express = require("express");
const cors = require("cors");
const authRouter = require("./Routes/authRoutes");
const storeRouter = require("./Routes/storeRoutes");
const inventoryRouter = require("./Routes/inventoryRoutes");
const paymentRouter = require("./Routes/payRoutes");
const orderRouter = require("./Routes/orderRoutes");

const app = express();


app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
<<<<<<< HEAD

=======
>>>>>>> 3aaa67ff438728ac574ce1b1c06fe09a6e718cc1
app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/pay", paymentRouter);
app.use("/api/v1/order", orderRouter);

module.exports = app;
