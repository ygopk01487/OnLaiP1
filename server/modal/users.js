const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: { type: String, default: "" },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
