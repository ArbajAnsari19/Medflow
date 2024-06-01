const express = require("express");
const router = express.Router();

const storeController = require("../Controller/storeController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");

//integrated to the frontend
router.post(
  "/createStore",
  protect,
  restrictTo("CEO", "Store Manager"),
  storeController.addStore
);
//integrated to the frontend
router.get("/getStores", protect, storeController.getAllStores);
//integrated to the frontend
router.post(
  "/updateStore/:id",
  protect,
  restrictTo("CEO", "Store Manager"),
  storeController.updateStore
);

module.exports = router;
