const Order = require("../models/Order");

const getAllOrders = async (req, res) => {
  const allOrders = await Order.find({}).populate('items.productId').populate('userId');
  res.json(allOrders);
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId').populate('userId');
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Error getting Order" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

const dispatchOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Dispatched" },
      { new: true }
    );

    if(order.status === "Dispatched"){
        res.json({msg: "Order Already Dispatched"});
    }
    if (!order) {
      return res.status(404).json({ error: "Order Not found" });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500); //{ error: "Failed to dispatch order" }
  }
};

module.exports = { createOrder, dispatchOrder, getAllOrders, getOrder };
