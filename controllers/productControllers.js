const express = require('expres');
const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
}

const createProduct = async (req, res) => {
    const { title, description, price, imgurl } = req.body;

    try{
        const newProduct = new Product({
            title: title,
            description: description,
            price: price,
            imgUrl: imgurl
        });

        await newProduct.save();
        res.alert("Product Saved");
    }
    catch(error){
        console.log(error);
        res.status(500).alert("Failed to create product");
    }
}

const deleteProduct = async (req, res) => {
    const title = req.body;

    const isProduct = await Product.findOne({title: title});
    if(!isProduct){
        res.status(400).alert("Product doesn't exist");
    }

    try{
        await Product.deleteOne({title: title});
        res.status(200).alert("Product succesfully deleted");
    }
    catch(error){
        res.status(500).alert("Failed To delete product");
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

module.exports = { getProducts, createProduct, deleteProduct };