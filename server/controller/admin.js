const User = require("../models/User");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

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
