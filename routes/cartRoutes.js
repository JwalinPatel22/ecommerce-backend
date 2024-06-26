const express = require("express");
const {
  getCart,
  createCart,
  addToCart,
  updateItemQty,
  removeFromCart,
} = require("../controllers/cartControllers");
const router = express.Router();

router.get("/:id", getCart);
router.post("/", createCart);
router.post("/add", addToCart);
router.patch("/update", updateItemQty);
router.delete("/delete", removeFromCart);

module.exports = router;
