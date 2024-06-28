const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//generating jwt token
const generateAuthToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.SECRET, {
    expiresIn: "1h",
  });
};

const registerUser = async function (req, res) {
  const { name, email, password } = req.body;

  existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(400).json({msg: "User already exists"});
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      });
      try {
        newUser.save();
        const token = generateAuthToken(newUser);
        res.json({ msg: "Registeration successful", token: token });
      } catch (error) {
        console.log("Cannot register user", error);
        res.status(500);
      }
    });
  }
};

const loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({ msg: "User not registered" });
    }

    //comparing passoword
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //generating jwt token
    const token = generateAuthToken(validUser);
    res.header("x-auth-token", token).json({ msg: "Login successful", token: token });
  } catch (error) {
    console.log("Login Failed", error);
    res.status(500);
  }
};

const getAllUsers = async function (req, res) {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

const getUser = async function (req, res) {
  const { id } = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user", error);
    res.status(500);
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getUser };
