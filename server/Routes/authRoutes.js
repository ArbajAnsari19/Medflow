const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const { protect } = require("../Controller/authController");
const { restrictTo } = require("../Controller/authController");

//integrated to the frontend
router.post("/signup", authController.signup);
//integrated to the frontend
router.post("/login", authController.login);
//integrated to the frontend
router.get(
  "/getUsers",
  protect,
  restrictTo("CEO", "Store Manager"),
  authController.getAllUsers
);
//integrated to the frontend
router.post("/updateUser/:id", protect, authController.updateUser);
//integrated to the frontend
router.delete("/deleteUser/:id", protect, authController.deleteUser);

module.exports = router;
