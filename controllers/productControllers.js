const express = require("express");
const Product = require("../models/Product");

const getAllProducts = async function (req, res) {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const getProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
};

const createProduct = async function (req, res) {
  const { title, brand, description, price, img, qty } = req.body;
  try {
    const existingProduct = await Product.findOne({
      title: title,
      brand: brand,
    });

    if (existingProduct) {
      existingProduct.qty += qty;
      await existingProduct.save();
      res.send("Product quantity updated");
    } else {
      const newProduct = new Product({
        title: title,
        brand: brand,
        description: description,
        price: price,
        qty: qty,
        img: img,
      });

      await newProduct.save();
      res.send("Product Created");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const deleteProduct = async function (req, res) {
  const isProduct = await Product.findById(req.params.id);
  if (!isProduct) {
    res.status(400).json({ error: "Product doesn't exist" });
  }

  try {
    await Product.deleteOne({ title: title });
    res.status(200).json({ msg: "Product succesfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed To delete product" });
  }
};

const updateProduct = async function (req, res) {
  try {
    const { title, description, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpadate(
      req.params.id,
      { title, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ msg: "Product Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
