const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async function(req, res){
    const { fname, lname, email, password } = req.body;

    existingUser = await User.findOne({email: email});
    if(existingUser){
        res.status(400).send("User already exists");
    }
    else{
        bcrypt.hash(password, saltRounds, function(err, hash){
            const newUser = new User({
                firstname: fname,
                lastname: lname,
                email: email,
                password: hash
            });
            try{
                newUser.save(); 
                res.render('registerSuccess'); 
            }
            catch(error){
                console.log(error);
                res.status(500).send("cannot register user");   
            } 
        });
    }
}

const loginUser = async function(req, res){
    const { email, password } = req.body;

    const validUser = await User.findOne({email: email});

    if(validUser){
        bcrypt.compare(password, validUser.password, function(error, result){
            if(result){
                if(validUser.isAdmin){
                    res.render("admin");
                }
                else{
                    res.render("secrets");
                }                
            }
            else{
                res.status(400).send("incorrect password");
            }
        });
    }
    else{
        res.status(400).send("user not registered");
    }         
}

module.exports = { registerUser, loginUser };