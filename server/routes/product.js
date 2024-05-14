const express = require("express");
const productController = require("../controller/product");

const router = express.Router();

// Get all products
router.get("/getProducts", productController.getProducts);

module.exports = router;
