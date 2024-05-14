const express = require("express");
const cartController = require("../controller/cart");

const router = express.Router();

// Get cart
router.get("/getCart", cartController.getCart);

// Update cart
router.post("/updateCart", cartController.updateCart);

module.exports = router;
