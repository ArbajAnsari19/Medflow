const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  user_id: {
    // user_id is a foreign key referencing the UserModel
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  store_id: {
    // store_id is a foreign key referencing the StoreModel
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreModel",
  },
  order_date: {
    type: Date,
    required: [true, "Order date is required"],
  },
  status: {
    // status can be one of the following: Pending, In Progress, Completed, Cancelled
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    required: [true, "Status is required"],
  },
  items: [
    {
      inventory_id: {
        // inventory_id is a foreign key referencing the inventoryModel
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventoryModel",
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },
    },
  ],
});

module.exports = mongoose.model("OrderModel", orderSchema);
