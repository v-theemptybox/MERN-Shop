const express = require("express");
const adminController = require("../controller/admin");
const upload = require("../middleware/multerUpload");

const router = express.Router();

// Get users
router.get("/getUsers", adminController.getUsers);

// Get orders
router.get("/getOrders", adminController.getOrders);

// Get reports
router.get("/getReports", adminController.getReports);

// Get products
router.get("/getProducts", adminController.getProducts);

// Create a product
router.post(
  "/postProduct",
  upload.array("uploadedImages", 4),
  adminController.postProduct
);

// Delete a product
router.delete("/deleteProduct", adminController.deleteProduct);

module.exports = router;
