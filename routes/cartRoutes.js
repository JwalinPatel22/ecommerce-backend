const express = require("express");
const auth = require("../middleware/auth");
const { createOrder } = require("../controllers/orderControllers");
const {
  getCart,
  createCart,
  addToCart,
  updateItemQty,
  removeFromCart,
  clearCart,
} = require("../controllers/cartControllers");
const router = express.Router();

router.get("/:id", auth, getCart);
router.post("/", auth, createCart);
router.post("/add", auth, addToCart);
router.patch("/update", auth, updateItemQty);
router.delete("/delete", auth, removeFromCart);
router.post("/clear-cart", clearCart);

//creating order
router.post("/order", auth, createOrder);

module.exports = router;
