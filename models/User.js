//jshint esversion:6
//User schema

const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({  
    firstname: String,
    lastname: String,

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Invalid Email']
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    register_date: {
        type: Date,
        default: Date.now
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;