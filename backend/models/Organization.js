const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gstNumber: { type: String },
  password: { type: String, required: true },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
