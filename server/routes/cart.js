const express = require("express");
const cartController = require("../controller/cart");

const router = express.Router();

// Get cart
router.get("/getCart", cartController.getCart);

// Update cart (add to cart and update number of products)
router.post("/updateCart", cartController.updateCart);

// Remove products from cart
router.put("/removeFromCart", cartController.deleteCartProduct);

module.exports = router;
