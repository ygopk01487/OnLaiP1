const express = require("express");
const {
  getAll,
  getByIdComment,
  addReply,
  editReply,
  removeReply,
  addLike,
  addDislike,
  removeAddLike,
  removeAddDisLike,
  deleteReply,
} = require("../controller/replys");
const router = express.Router();

router.get("/getAllReplys", getAll);

router.post("/getByIdComment", getByIdComment);
router.post("/addReply", addReply);
router.post("/addLikeReply", addLike);
router.post("/addDislikeReply", addDislike);

router.put("/edtiReply/:id", editReply);
router.put("/removeReply/:id", removeReply);
router.put("/removeLikeReply/:id", removeAddLike);
router.put("/removeDislikeReply/:id", removeAddDisLike);

router.delete("/deleteReply/:id", deleteReply);

module.exports = router;
