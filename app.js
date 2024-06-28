const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/ecomDB");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, function (req, res) {
  console.log("app started successfully on port 3000");
});
