const Product = require("../models/Product");

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
    await Product.deleteOne({_id: req.params.id});
    res.status(200).json({ msg: "Product succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

// const updateProduct = async function (req, res) {
//   try {
//     const { title, brand, description, price, qty, img } = req.body;
//     const updatedProduct = await Product.findByIdAndUpadate(
//       req.params._id, title, brand, description, price, qty, img ,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.status(200).json({ msg: "Product Updated" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

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

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
