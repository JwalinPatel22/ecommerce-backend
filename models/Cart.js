//jshint esversion:6
//Cart schema
const mongoose = require("mongoose");
const User = require("./User");
const Prodcut = require("./Product");
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  items: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      qty: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be less than 1"],
      },

      price: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
