const express = require("express");
const {
  getAll,
  getByIdUsersOther,
  addUsersOther,
  deleteUserOther,
} = require("../controller/usersOther");
const router = express.Router();

router.get("/getAllUsersOther", getAll);

router.post("/getByIdUsersOther", getByIdUsersOther);
router.post("/addUserOther", addUsersOther);

router.delete("/deleteUserOther/:id", deleteUserOther);

module.exports = router;
