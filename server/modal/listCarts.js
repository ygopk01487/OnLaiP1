const mongoose = require("mongoose");

const ListCartsSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  quantity: Number,
});

const ListCarts = mongoose.model("carts", ListCartsSchema);

module.exports = ListCarts;
