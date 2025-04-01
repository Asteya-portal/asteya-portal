const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  companyName: { type: String },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
