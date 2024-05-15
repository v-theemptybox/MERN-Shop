const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Get orders by user id
exports.getOrdersByUser = async (req, res, next) => {
  try {
    if (req.session.isLoggedIn) {
      const order = await Order.find({ user: req.session.user._id }).populate(
        "user"
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json(order);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Create an order
exports.postOrder = async (req, res, next) => {
  try {
    const { cartId, status, totalPrice } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // create an order
    if (cart.products) {
    }
    let order = new Order({
      user: cart.user,
      products: cart.products,
      totalPrice,
      status,
    });
    await order.save();
    order = await order.populate("products.product");

    // remove all products from cart
    if (cart) {
      cart.products = [];
      await cart.save();
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
