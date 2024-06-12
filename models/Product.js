//jshint esversion:6
//Products schema

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },

    brand:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },  

    date_added: {
        type: Date,
        default: Date.now
    },

    qty: {
        type: Number,
        default: 1,
        min: 0,
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;