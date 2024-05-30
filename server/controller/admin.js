const mongoose = require("mongoose");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

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

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const page = +req.query.page || 1;

    if (!users) {
      res.status(404).json({ message: "Users not found" });
    }

    const sortedUsers = users.sort((a, b) => b.createdAt - a.createdAt);

    const results = paging(sortedUsers, PAGE_SIZE, page);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(sortedUsers.length / PAGE_SIZE),
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

    const sortedProducts = products.sort((a, b) => b.updatedAt - a.updatedAt);
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
      return res.status(400).json({ message: "All fields are required" });
    }

    // uploaded files must be 4 images
    if (files.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 images are required" });
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

// Get a product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
exports.putProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, price, shortDesc, longDesc, category, stock } = req.body;
    const files = req.files;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // validate the request fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (price && price > 0) updateFields.price = price;
    if (shortDesc) updateFields.short_desc = shortDesc;
    if (longDesc) updateFields.long_desc = longDesc;
    if (category) updateFields.category = category;
    if (stock && stock > 0) updateFields.stock = stock;

    if (files && files.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 images are required" });
    }

    // if files are provided, update the image fields
    if (files) {
      files.forEach((file, index) => {
        updateFields[
          `img${index + 1}`
        ] = `http://localhost:5000/uploads/${file.filename}`;
      });
    }

    const product = await Product.findByIdAndUpdate(productId, updateFields, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;

    const carts = await Cart.find().populate("products");
    const orders = await Order.find().populate("products");

    // get delete product by id
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isProductInCart = carts.some((cart) =>
      cart.products.some((p) => p.product.toString() === productId)
    );

    const isProductInOrder = orders.some((order) =>
      order.products.some((p) => p.product.toString() === productId)
    );

    if (isProductInCart || isProductInOrder) {
      return res.status(400).json({
        message: "Product is in a cart or an order. Cannot be deleted",
      });
    }

    // get images path to delete; if there is any falsy value, that falsy value will be excluded
    const images = [
      product.img1,
      product.img2,
      product.img3,
      product.img4,
    ].filter(Boolean);

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

// Get all sessions
exports.getSessions = async (req, res, next) => {
  try {
    // get db through current connection
    const { db } = mongoose.connection;

    const sessions = await db.collection("sessions").find().toArray();
    if (!sessions) {
      return;
    }

    res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
