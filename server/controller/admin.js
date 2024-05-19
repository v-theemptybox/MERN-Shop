const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const fileHelper = require("../utils/filerHelper");
const paging = require("../utils/paging");
const PAGE_SIZE = 5;

// Get reports for Infoboard(admin)
exports.getReports = async (req, res, next) => {
  try {
    // number of users in the system
    const userAmount = await User.countDocuments();
    // number of orders in the system
    const orderAmount = await Order.countDocuments();

    const monthlyAveragePriceAggregate = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalMonthlyPrice: { $sum: "$totalPrice" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          averageTotalPrice: { $divide: ["$totalMonthlyPrice", "$count"] },
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
    ]);

    const results = [
      userAmount || 0,
      monthlyAveragePriceAggregate[
        monthlyAveragePriceAggregate.length - 1
      ].averageTotalPrice.toFixed(2) || 0,
      orderAmount || 0,
    ];

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user");
    // get page through query params
    const page = +req.query.page || 1;

    if (!orders) {
      res.status(404).json({ message: "Order not found" });
    }

    // descending sort orders by create time (createdAt)
    const sortedOrders = orders.sort((a, b) => b.createdAt - a.createdAt);
    // each page has PAGE_SIZE item
    const results = paging(sortedOrders, PAGE_SIZE, page);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(sortedOrders.length / PAGE_SIZE),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    // get page through query params
    const page = +req.query.page || 1;

    if (!products) {
      res.status(404).json({ message: "Product not found" });
    }

    const sortedProducts = products.sort((a, b) => b.createdAt - a.createdAt);
    const results = paging(sortedProducts, PAGE_SIZE, page);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(sortedProducts.length / PAGE_SIZE),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a product
exports.postProduct = async (req, res, next) => {
  try {
    const { name, price, shortDesc, longDesc, category, stock } = req.body;
    const files = req.files;

    if (
      !name ||
      !price ||
      !shortDesc ||
      !longDesc ||
      !category ||
      !stock ||
      !files
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // uploaded files must be 4 images
    if (files.length !== 4) {
      return res
        .status(400)
        .json({ message: "Exactly 4 images are required." });
    }

    const newProduct = new Product({
      name,
      price,
      short_desc: shortDesc,
      long_desc: longDesc,
      category,
      stock,
    });

    files.forEach((file, index) => {
      newProduct[
        `img${index + 1}`
      ] = `http://localhost:5000/uploads/${file.filename}`;
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    console.log(productId);
    console.log(req.body);
    // get delete product by id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // get images path to delete; if there is any falsy value, that falsy value will be excluded
    const images = [
      product.img1,
      product.img2,
      product.img3,
      product.img4,
    ].filter(Boolean);

    console.log(images);

    // delete product data in db
    await Product.deleteOne({ _id: productId });

    // delete images
    const domain = "http://localhost:5000/";
    images.forEach((imagePath) => {
      const relativePath = imagePath.replace(domain, "");
      fileHelper.deleteFile(relativePath);
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
