const mongoose = require("mongoose");

const ListLoveSchema = mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  userOther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersOther",
  },

  createDate: { type: Date, default: Date.now },
});

const ListLove = mongoose.model("ListLove", ListLoveSchema);

module.exports = ListLove;
