//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { isAdmin } = require('./middleware/auth')
// const User = require('./models/User');

// const bcrypt = require('bcrypt');
// const saltRounds = 10;


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/ecomDB");

//routes
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, function(req, res){
    console.log("app started successfully on port 3000");
});