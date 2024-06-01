const mongoose = require("mongoose");
const validator = require("validator");

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  manufacturer: {
    type: String,
    required: [true, "Manufacturer is required"],
  },
  image: {
    type: String,
  },
  unit: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  store_id: {
    // store_id is a foreign key referencing the StoreModel
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreModel",
  },
});

module.exports = mongoose.model("inventoryModel", inventorySchema);
