const express = require("express");
const {
  getAllOrder,
  addOrders,
  getOrderByUser,
  deleteOrderByUser,
} = require("../controller/order");
const router = express.Router();

router.get("/getAllOrder", getAllOrder);

router.post("/getOrderByUser", getOrderByUser);
router.post("/addOrder", addOrders);

router.delete("/deleteOrderById/:id", deleteOrderByUser);

module.exports = router;
