const mongoose = require("mongoose");

const images =
  "https://banner2.cleanpng.com/20180811/oy/kisspng-computer-icons-clip-art-user-profile-image-member-svg-png-icon-free-download-288552-onli-5b6f6bc83d0489.8542259415340287442499.jpg";

const UsersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: images,
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
