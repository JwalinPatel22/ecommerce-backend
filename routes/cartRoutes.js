const express = require("express");
const auth = require("../middleware/auth");
const {
  getCart,
  createCart,
  addToCart,
  updateItemQty,
  removeFromCart,
} = require("../controllers/cartControllers");
const router = express.Router();

router.get("/:id", auth, getCart);
router.post("/", auth, createCart);
router.post("/add", auth, addToCart);
router.patch("/update", auth, updateItemQty);
router.delete("/delete", auth, removeFromCart);

module.exports = router;
