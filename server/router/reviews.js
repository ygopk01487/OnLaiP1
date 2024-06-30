const express = require("express");
const {
  getByIdPro,
  addReviews,
  editReviews,
  deleteCommnet,
  deleteReviews,
  getAllReview,
  addLike,
  addDislike,
  removeLike,
  removeDislike,
} = require("../controller/reviews");
const router = express.Router();

router.get("/getAllReview", getAllReview);

router.post("/addLikes", addLike);
router.post("/addDislikes", addDislike);
router.post("/getById", getByIdPro);
router.post("/addReview", addReviews);

router.put("/editReview", editReviews);

router.put("/deleteComment", deleteCommnet);
router.put("/deleteLike/:id", removeLike);
router.put("/deleteDislike/:id", removeDislike);

router.delete("/deleteReview/:id", deleteReviews);

module.exports = router;
