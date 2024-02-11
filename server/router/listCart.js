const express = require("express");
const {
  getAllCart,
  getByUserCart,
  addCart,
  editCart,
  deleteListProCart,
  deleteCart,
} = require("../controller/ListCart");
const router = express.Router();

router.get("/allCart", getAllCart);

router.post("/cartByUser", getByUserCart);
router.post("/addCart", addCart);

router.put("/editCart/:id", editCart);
router.put("/deleteProCart/:id", deleteListProCart);

router.delete("/deleteCart/:id", deleteCart);

module.exports = router;
