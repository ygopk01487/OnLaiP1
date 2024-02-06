const mongoose = require("mongoose");

const UsersOtherSchema = mongoose.Schema({
  name: String,
  email: String,
  image: String,
  localId: String,
});

const UsersOther = mongoose.model("usersOther", UsersOtherSchema);

module.exports = UsersOther;
