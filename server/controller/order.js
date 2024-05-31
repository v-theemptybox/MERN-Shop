const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

require("dotenv").config();

const paging = require("../utils/paging");
const PAGE_SIZE = 5;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "stars.nhiepphong@gmail.com",
    pass: process.env.MAIL_KEY,
  },
});

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

    const cart = await Cart.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Check stock availability and update stock
    for (let p of cart.products) {
      const product = await Product.findById(p.product);
      if (product.stock < p.quantity) {
        return res
          .status(400)
          .json({ message: `Out of stock for product: ${product.name}` });
      }
      // Update stock
      product.stock -= p.quantity;
      await product.save();
    }

    // create an order
    let order = new Order({
      user: cart.user,
      products: cart.products,
      totalPrice,
      status,
    });
    await order.save();
    order = await order.populate("products.product");
    const userOrder = await order.populate("user");

    // remove all products from cart
    cart.products = [];
    await cart.save();

    // convert products array to string (join(""))
    const productsHtml = order.products
      .map(
        (item) => `
          <tr>
            <td style="border:1px solid black;">${item.product.name}</td>
            <td style="border:1px solid black;"><img src="${
              item.product.img1
            }" alt="${item.product.name}" width="50" /></td>
            <td style="border:1px solid black;">${(+item.product
              .price).toLocaleString("vi-VN")} VND</td>
            <td style="border:1px solid black;">${item.quantity}</td>
            <td style="border:1px solid black;">${item.totalProduct.toLocaleString(
              "vi-VN"
            )} VND</td>
          </tr>
        `
      )
      .join("");

    try {
      await transporter.sendMail({
        from: { name: "vTechShop", address: "stars.nhiepphong@gmail.com" },
        to: userOrder.user.email,
        subject: "Confirm order",
        html: `<h1>Xin chào ${userOrder.user.fullName}</h1>
              <p>Phone: ${userOrder.user.phone}</p>
              <p>Address: ${userOrder.user.address}</p>
              <table>
                <tbody style="border:1px solid black;text-align:center;">
                  <tr>
                    <td style="border:1px solid black;">
                      Tên Sản Phẩm
                    </td>
                    <td style="border:1px solid black;">
                      Hình ảnh
                    </td>
                    <td style="border:1px solid black;">
                      Giá
                    </td>
                    <td style="border:1px solid black;">
                      Số Lượng
                    </td>
                    <td style="border:1px solid black;">
                      Thành tiền
                    </td>
                  </tr>
                  ${productsHtml}
                </tbody>
              </table>
              <h3>Tổng thanh toán: ${order.totalPrice.toLocaleString(
                "vi-VN"
              )} VND</h3>
              <h3>Cảm ơn bạn!</h3>`,
      });
    } catch (error) {
      console.log("Error sending email:", error);
    }

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by id
exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate(
      "user products.product"
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
