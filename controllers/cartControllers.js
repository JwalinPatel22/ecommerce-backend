const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async function (req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate(
      'items.productId'
    );
    if (!cart) {
      res.status(400).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log("Failed to get cart", error);
    res.status(500);
  }
};

const createCart = async function (req, res) {
  try {
    const { userId, items } = req.body;
    const newCart = new Cart({
      userId,
      items,
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.log("Failed to create cart", error);
    res.status(500);
  }
};

// const addToCart = async function (req, res) {
//   try {
//     const { userId, productId } = req.body;
//     let cart = await Cart.findOne({ userId });

//     //creating the cart if it doesn't exist already
//     if (!cart) {
//       cart = await Cart.create({ userId: userId, items: [] });
//     }

//     //checking if product already exists or not. If not, adding new product to cart
//     const existingProductIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );
//     if (existingProductIndex > -1) {
//       cart.items[existingProductIndex].qty += 1;
//     } else {
//       cart.items.push({ productId, qty: 1 });
//     }
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.log("Failed to add product to cart", error);
//     res.status(500);
//   }
// };

const addToCart = async function (req, res) {
  try {
    const { userId, productId } = req.body;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    let cart = await Cart.findOne({ userId });

    // Creating the cart if it doesn't exist already
    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    // Check if product already exists or not. If not, add new product to cart
    const existingProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingProductIndex > -1) {
      cart.items[existingProductIndex].qty += 1;
    } else {
      cart.items.push({ productId, qty: 1 });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log("Failed to add product to cart", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

const updateItemQty = async function (req, res) {
  try {
    const { userId, productId, qty } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const item = await cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    item.qty += qty;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("Failed to update product quantity", error);
    res.status(500);
  }
};

const removeFromCart = async function (req, res) {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    //removing required product from cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    const updatedCart = await cart.save();
    res.json({ cart: updatedCart });
  } catch (error) {
    console.log("Cannot remove item from cart", error);
    res.status(500);
  }
};

module.exports = {
  getCart,
  createCart,
  addToCart,
  updateItemQty,
  removeFromCart,
};
