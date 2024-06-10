const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async function(req, res){
    try{
        const cart = Cart.findOne({userId: req.user._id}).populate('productId');
        res.status(200).json({msg: 'ok', cart});  
    }
    catch(error){
        console.log(error);
        
    }
    
}