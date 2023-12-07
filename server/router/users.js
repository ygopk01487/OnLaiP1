const express = require("express");
const {
  getAllUser,
  createUser,
  deleteUser,
  login,
  getOneUser,
  authenticateToken,
  refreshToken,
  logout,
  sendMail,
  checkOTP,
  getAllOTP,
  deleteOTP,
  forgetPassword,
  checkEmail,
  getOneUSerOTP,
} = require("../controller/users");
const router = express.Router();

router.get("/users", getAllUser);
router.get("/getOne", authenticateToken, getOneUser);
router.get("/getAllOTP", getAllOTP);
router.post("/checkEmail", checkEmail);
router.post("/addUsers", createUser);
router.post("/updatePass", forgetPassword);
router.post("/token", refreshToken);
router.post("/signIn", login);
router.post("/sendMail", sendMail);
router.post("/checkOTP", checkOTP);
router.post("/getOneUserOTP", getOneUSerOTP);
router.put("/deleteOtp/:id", deleteOTP);
router.delete("/deleteUser/:id", deleteUser);
router.delete("/logOut", logout);

module.exports = router;
