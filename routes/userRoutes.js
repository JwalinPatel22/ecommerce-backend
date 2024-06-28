const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/user/:id", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
