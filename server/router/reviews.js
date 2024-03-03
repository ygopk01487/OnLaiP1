const express = require("express");
const {
  getByIdPro,
  addReviews,
  editReviews,
  deleteCommnet,
  deleteReviews,
  getAllReview,
} = require("../controller/reviews");
const router = express.Router();

router.get("/getAllReview", getAllReview);

router.post("/getById", getByIdPro);
router.post("/addReview", addReviews);

router.put("/editReview", editReviews);

router.put("/deleteComment", deleteCommnet);

router.delete("/deleteReview/:id", deleteReviews);

module.exports = router;
