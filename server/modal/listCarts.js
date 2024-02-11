const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
  quantity: { type: Number },
  total: { type: Number },
});

const ListCartsSchema = mongoose.Schema({
  products: [itemsSchema],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  userOther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersOther",
  },

  sale: { type: Number, default: 0 },

  totalPrice: { type: Number },
});

const ListCarts = mongoose.model("carts", ListCartsSchema);

module.exports = ListCarts;
