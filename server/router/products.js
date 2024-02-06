const express = require("express");
const {
  getAllProducts,
  getIdProducts,
  addProducts,
  updateProducts,
  delteProducts,
} = require("../controller/producst");
const router = express.Router();

router.get("/AllProducts", getAllProducts);
router.get("/IdProducts/:id", getIdProducts);

router.post("/addProduct", addProducts);

router.put("/updateProduct/:id", updateProducts);

router.delete("/deleteProduct", delteProducts);

module.exports = router;
