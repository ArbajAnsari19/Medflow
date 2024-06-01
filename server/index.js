const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoutes");

var PORT = process.env.PORT || 4000;
var connString = process.env.CONNECTION_STRING || "mongodb://localhost:27017";

mongoose
  .connect(connString)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server Started on Port", PORT);
});
