//jshint esversion:6
//Products schema

const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },  

    date_added: {
        type: Date,
        default: Date.now
    },

    qty: {
        type: Number,
        default: 1
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;