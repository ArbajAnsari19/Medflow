const mongoose = require("mongoose");
const validator = require("validator");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  location: {
    type: [Number],
    required: [true, "Enter valid location"],
  },
  contactNumber: {
    type: String,
    required: [true, "Store contact number required"],
  },
  workers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("StoreModel", storeSchema);
