const Product = require("../models/Product");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//jwt token
const generateAuthToken = (admin) => {
  return jwt.sign(
    { id: admin._id, name: admin.name, email: admin.email },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
};

//Product management controllers
const getAllProducts = async function (req, res) {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const getProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error getting product" });
  }
};

const createProduct = async function (req, res) {
  const { title, brand, description, price, img, qty } = req.body;
  try {
    const existingProduct = await Product.findOne({
      title: title,
      brand: brand,
    });

    if (existingProduct) {
      existingProduct.qty += qty;
      await existingProduct.save();
      res.send("Product quantity updated");
    } else {
      const newProduct = new Product({
        title: title,
        brand: brand,
        description: description,
        price: price,
        qty: qty,
        img: img,
      });

      await newProduct.save();
      res.send("Product Created");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

const deleteProduct = async function (req, res) {
  const isProduct = await Product.findById(req.params.id);
  if (!isProduct) {
    res.status(400).json({ error: "Product doesn't exist" });
  }

  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: "Product succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async function (req, res) {
  const { title, brand, description, price, qty, img } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product Not found" });
    }

    product.title = title;
    product.brand = brand;
    product.description = description;
    product.price = price;
    product.qty = qty;
    product.img = img;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

//Admin login
const adminLogin = async function (req, res) {
  const { adminEmail, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email: adminEmail });
    if (!validAdmin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const validPassword = await bcrypt.compare(password, validAdmin.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateAuthToken(validAdmin);
    res
      .header("x-auth-token", token)
      .json({ msg: "Admin Login successful", token: token });
  } catch (error) {
    console.log("Admin login failed", error);
    res.status(500);
  }
};

const createAdmin = async function (req, res) {
  const { adminName, adminEmail, password } = req.body;
  const existingAdmin = await Admin.findOne({ adminEmail });
  if (existingAdmin) {
    return res.status(400).json({ msg: "Admin already exists" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      const newAdmin = new Admin({
        name: adminName,
        email: adminEmail,
        password: hash,
      });

      try {
        newAdmin.save();
        res.json({ msg: "Admin created" });
      } catch (error) {
        console.log("Failed to create admin", error);
      }
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  adminLogin,
  createAdmin,
};
