const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  organizationName: String,
  contactPerson: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  gstNumber: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
