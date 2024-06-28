const mongoose = require("mongoose");
const { isEmail } = require("validator");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid Email"],
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
