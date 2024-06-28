const Product = require("../models/Product");

const getAllProducts = async function (req, res) {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const getProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
};
