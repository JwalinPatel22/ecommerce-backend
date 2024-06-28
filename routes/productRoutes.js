const express = require("express");
const {
  getAllProducts,
  getProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);

module.exports = router;
