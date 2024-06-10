const express = require('express');
const Product = require('../models/Product');

const getProducts = async function (req, res) {
    const allProducts = await Product.find({});
    res.json(allProducts);
}

const createProduct = async function (req, res) {
    const { title, description, price, qty } = req.body;

    try{
        const newProduct = new Product({
            title: title,
            description: description,
            price: price,
            qty: qty
        });

        await newProduct.save();
        res.send("Product Saved");
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to create product"});
    }
}

const deleteProduct = async function (req, res) {
    const title = req.body;

    const isProduct = await Product.findOne({title: title});
    if(!isProduct){
        res.status(400).json({error: "Product doesn't exist"});
    }

    try{
        await Product.deleteOne({title: title});
        res.status(200).json({msg: "Product succesfully deleted"});
    }
    catch(error){
        res.status(500).json({error: "Failed To delete product"});
    }
}
// const deleteProduct = asyncHandler(async(req,res) => {
//     const product = await Product.findById(req.params.id)

//     if(product) {
//         await product.remove()
//         res.json({message:'Product removed'})
//     } else {
//         res.status(404)
//         throw new Error('Product not found')
//     }
// });

const updateProduct = async function (req, res) {
    try{
        const { title, description, price } = req.body;
        const updatedProduct = await Product.findByIdAndUpadate(
            req.params.id,
            { title, description, price },
            { new: true }
        );

        if(!updatedProduct){
            return res.status(404).json({error: "Product not found"});
        }
        res.status(200).json({msg: "Product Updated"});  
    }
    catch (error){
        console.log(error);
        res.status(500).json({error: "Something went wrong"});
    }
}

module.exports = { getProducts, createProduct, deleteProduct, updateProduct };