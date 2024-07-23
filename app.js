const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
require("dotenv").config();
const uri =
  "mongodb+srv://hello:<password>@ecommerce-testing.aehaeet.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-testing";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
   // await mongoose.disconnect();
  }
}
run().catch(console.dir);

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
