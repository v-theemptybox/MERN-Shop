const express = require("express");
const cartController = require("../controller/cart");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get cart
router.get("/getCart", cartController.getCart);

// Update cart (add to cart and update number of products)
router.post(
  "/updateCart",
  authMiddleware.isAuthenticated,
  cartController.updateCart
);

// Remove product from cart
router.put(
  "/removeFromCart",
  authMiddleware.isAuthenticated,
  cartController.deleteCartProduct
);

module.exports = router;
