const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
