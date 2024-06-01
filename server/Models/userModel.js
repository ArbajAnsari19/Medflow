const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Contact Number is required"],
  },
  role: {
    type: String,
    enum: ["User", "CEO", "Store Manager"],
    default: "user",
  },
  location: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderModel",
    },
  ],
});

module.exports = mongoose.model("userModel", userSchema);

//pending changes -->
