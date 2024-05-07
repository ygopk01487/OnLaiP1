const mongoose = require("mongoose");

const ordersCart = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  usersOther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersOther",
  },
  totalPrice: {
    type: Number,
  },
  totalPriceSale: {
    type: Number,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: { type: Number },
      total: { type: Number },
    },
  ],
  details: {
    country: { type: String },
    phone: { type: Number },
    address: { type: String },
    notes: {
      type: String,
    },
  },
  codeSale: [
    {
      nameSale: { type: String, default: "" },
      value: { type: Number, default: 0 },
    },
  ],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderProdcts = mongoose.model("orders", ordersCart);
module.exports = OrderProdcts;
