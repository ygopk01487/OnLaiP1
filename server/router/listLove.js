const express = require("express");
const {
  getAllListLove,
  addListLove,
  deleteListLove,
  deleteProListLove,
  getByUSerListLove,
} = require("../controller/ListLove");
const router = express.Router();

router.get("/getAllLove", getAllListLove);

router.post("/addLove", addListLove);
router.post("/getByUserLove", getByUSerListLove);

router.put("/deleteProList/:id", deleteProListLove);

router.delete("/deleteLove/:id", deleteListLove);

module.exports = router;
