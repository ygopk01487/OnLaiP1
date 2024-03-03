const mongosee = require("mongoose");

const commentsSchema = new mongosee.Schema({
  user: { type: mongosee.Schema.Types.ObjectId, ref: "Users" },
  userOther: { type: mongosee.Schema.Types.ObjectId, ref: "usersOther" },
  star: { type: Number },
  comment: { type: String },
  createDate: { type: Date, default: new Date() },
  textEdit: { type: String, default: "" },
});

const reviewsSchema = new mongosee.Schema({
  product: { type: mongosee.Schema.Types.ObjectId, ref: "Products" },
  review: [commentsSchema],
});

const reviews = mongosee.model("reviews", reviewsSchema);

module.exports = reviews;
