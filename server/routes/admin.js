const express = require("express");
const adminController = require("../controller/admin");
const upload = require("../middleware/multerUpload");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// admin auth middleware
// router.use(authMiddleware.checkRole("admin"));

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

// Get a product
router.get("/getProduct/:productId", adminController.getProduct);

// Update a product
router.put(
  "/putProduct/:productId",
  upload.array("uploadedImages", 4),
  adminController.putProduct
);

// Delete a product
router.delete("/deleteProduct", adminController.deleteProduct);

// Get all sessions
router.get("/getSessions", adminController.getSessions);

module.exports = router;
