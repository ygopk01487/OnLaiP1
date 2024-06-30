const mongosee = require("mongoose");

const replySchema = new mongosee.Schema({
  idComment: {
    idReviewProduct: {
      type: mongosee.Schema.Types.ObjectId,
      ref: "reviews",
    },
    idReviewUser: {
      type: mongosee.Schema.Types.ObjectId,
      ref: "reviews",
    },
  },
  replyss: [
    {
      textEdit: { type: String, default: "" },
      createDate: { type: Date, default: new Date() },
      replyUser: { type: mongosee.Schema.Types.ObjectId, ref: "Users" },
      replyUserOther: {
        type: mongosee.Schema.Types.ObjectId,
        ref: "usersOther",
      },
      like: [
        {
          user: { type: mongosee.Schema.Types.ObjectId, ref: "Users" },
          userOther: {
            type: mongosee.Schema.Types.ObjectId,
            ref: "usersOther",
          },
          countLike: { type: Number, default: 0 },
        },
      ],
      dislike: [
        {
          user: { type: mongosee.Schema.Types.ObjectId, ref: "Users" },
          userOther: {
            type: mongosee.Schema.Types.ObjectId,
            ref: "usersOther",
          },
          countDislike: { type: Number, default: 0 },
        },
      ],
      receverUser: { type: mongosee.Schema.Types.ObjectId, ref: "Users" },
      receverUserOther: {
        type: mongosee.Schema.Types.ObjectId,
        ref: "usersOther",
      },
      comment: { type: String },
      checkReply: { type: String, default: "" },
    },
  ],
});

const replys = mongosee.model("replys", replySchema);
module.exports = replys;
