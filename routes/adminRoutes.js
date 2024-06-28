const express = require("express");

const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  adminLogin,
  createAdmin,
} = require("../controllers/adminControllers");
const { getAllUsers, getUser } = require("../controllers/userControllers");
const router = express.Router();

//for users
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);

//for admins
router.post("/", adminLogin);
router.post("/newAdmin", createAdmin);

//for products
router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.post("/create-product", createProduct);
router.delete("/delete-product/:id", deleteProduct);
router.patch("/update-product/:id", updateProduct);

module.exports = router;