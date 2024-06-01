const Inventory = require("../Models/inventoryModel");

exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.status(200).json({
      status: "success",
      data: {
        inventories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getInventoriesByStoreId = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const inventories = await Inventory.find({ store_id: storeId });
    res.status(200).json({
      status: "success",
      data: {
        inventories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.addInventory = async (req, res) => {
  try {
    const newInventory = await Inventory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        inventory: newInventory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        inventory: updatedInventory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
