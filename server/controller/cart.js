const Cart = require("../models/Cart");

// Get cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user._id }).populate(
      "products.product"
    );
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

// Update cart
exports.updateCart = async (req, res, next) => {
  try {
    const { user, products } = req.body;
    let cart = await Cart.findOne({ user });

    if (cart) {
      products.forEach((newProduct) => {
        const existingProductIndex = cart.products.findIndex(
          (item) => item.product.toString() === newProduct.product
        );

        if (existingProductIndex !== -1) {
          // if the product already exists, update the quantity and price
          cart.products[existingProductIndex].quantity += newProduct.quantity;
          cart.products[existingProductIndex].totalProduct +=
            newProduct.totalProduct;
        } else {
          // if the product does not exist, add a new product to the cart
          cart.products.push(newProduct);
        }
      });

      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully.", cart });
    } else {
      // if the shopping cart does not exist, create a new one
      cart = new Cart({ user, products });
      await cart.save();
      return res
        .status(201)
        .json({ message: "Cart created successfully.", cart });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete product in cart
exports.deleteCartProduct = async (req, res, next) => {
  try {
    const { user, productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user },
      { $pull: { products: { product: productId } } }, // use $pull of MongoDB to remove "product" from "products" array
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    return res
      .status(200)
      .json({ message: "Product removed successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
