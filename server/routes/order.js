const express = require("express");
const orderController = require("../controller/order");

const router = express.Router();

// Create an order
router.post("/postOrder", orderController.postOrder);

// Get order by user id
router.get("/getOrdersByUser", orderController.getOrdersByUser);

module.exports = router;
