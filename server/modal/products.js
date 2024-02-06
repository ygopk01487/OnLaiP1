const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  discount: Number,
  image: String,
  describe: String,
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
