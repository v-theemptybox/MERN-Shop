const express = require("express");
const adminController = require("../controller/admin");

const router = express.Router();

// Get orders
router.get("/getOrders", adminController.getOrders);

// Get reports
router.get("/getReports", adminController.getReports);

module.exports = router;
