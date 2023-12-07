const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: { type: String, require: true },
  otp: String,
  createAt: Date,
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
