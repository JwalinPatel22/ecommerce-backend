const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async function(req, res){
    try{
        const cart = await Cart.findOne({userId: req.user._id}).populate('item.productId');
        if(!cart){
            res.staus(404).json({error: "Cart not found"});
        }
        res.status(200).json({cart});
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg: "Failed to get cart"});
    }    
}

const addToCart = async function(req, res){
    try{
        const {productId} = req.body;
        let cart = await Cart.findOne({userId: req.user._id});

        //creating the cart if it doesn't exist already
        if(!cart){
            cart = await Cart.create({userId: req.user._id, items:[]});
        }
        
        //checking if product already exists or not. If not, adding new product to cart
        const existingProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex > -1) {
            cart.items[existingProductIndex].quantity += 1;
        } else {
            cart.items.push({ productId, quantity: 1 });
        }
        await cart.save();
        res.json({cart});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to add item to cart"});
    }
}

const removeFromCart = async function(req, res){
    try{
        const {productId} = req.body;
        const cart = await Cart.findOne({userId: req.user._id});
        //removing required product from cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Cannot remove item from cart"});
    }
}

module.exports = {getCart, addToCart, removeFromCart};