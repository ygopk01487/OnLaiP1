const Users = require("../modal/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../router/users");
const { generateOTP } = require("../sendMail/generateOTP");
const { sendMails } = require("../sendMail/senMails");
const OTP = require("../modal/otp");
require("dotenv").config();

let refreshTokens = [];

//create
const createUser = async (req, res) => {
  const { name, email, password, rePassword } = req.body;

  if (password !== rePassword) {
    return res
      .status(404)
      .json({ success: false, message: "password dissimilarity" });
  }

  const checkEmail = await Users.findOne({ email });

  if (checkEmail) {
    return res
      .status(404)
      .json({ success: false, message: "email already exist" });
  }

  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new Users({ name, email, password: hashPassword });

  try {
    await newUser.save();

    res.status(200).json({
      success: true,
      newUser: newUser,
      message: "create user true!!!!",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "create user fail!!!!" });
  }
};

//get all
const getAllUser = async (req, res) => {
  try {
    const users = await Users.find();

    res
      .status(200)
      .json({ success: true, users: users, message: "get all user true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "get all user fail!!!!" });
  }
};

//get one
const getOneUser = async (req, res) => {
  const { user } = req;
  try {
    res
      .status(200)
      .json({ success: true, user, message: "get one user true!!" });
  } catch (error) {
    res.status(404).json({ success: false, message: "get one user fail!!!!" });
  }
};

//sign in
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "email not already exits" });
  }

  const compareHashed = await bcrypt.compare(password, user.password);

  if (!compareHashed) {
    return res
      .status(400)
      .json({ success: false, message: "password not true!!!" });
  }

  try {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await jwt.sign(
      { user },
      process.env.REFRESH_TOKEN_SECRET
    );

    refreshTokens.push(refreshToken);

    res.status(200).json({
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "login true",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "login fail!!!!" });
  }
};

//authenticate token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) {
      return res.status(401).json({ success: false, message: "token null" });
    }

    const tokens = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (tokens === null)
      return res
        .status(404)
        .json({ success: false, message: "token nulllll 12312!" });

    req.user = tokens.user;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: "token not run!!" });
  }
};

//generateAccessToken
const generateAccessToken = async (user) => {
  try {
    return await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "not run!!" });
  }
};

//token
const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (token === null) {
    return res
      .status(400)
      .json({ success: false, message: "refresh token null!!" });
  }

  if (!refreshTokens.includes(token)) {
    return res
      .status(404)
      .json({ success: false, message: "refresh token nnot token" });
  }
  try {
    const tk = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = await generateAccessToken(tk.user);
    res.status(200).json({ success: true, accessToken: accessToken });
  } catch (error) {
    res.status(404).json({ success: false, message: "refresh token fail" });
  }
};

//put

//delete
const deleteUser = async (req, res) => {
  const { id } = req.param;
  try {
    const users = await Users.findOneAndDelete(id);
    res.status(200).json({
      success: true,
      usersDelete: users,
      message: "delete one user trueeeeeee!!!",
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "delete one user fail!!!!" });
  }
};

//delete refresh token
const logout = async (req, res) => {
  const { token } = req.body;
  try {
    refreshTokens = refreshTokens.filter((tokens) => tokens !== token);
    res
      .status(200)
      .json({ success: true, message: "delete refresh token true" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "delete refresh token fail!!!!" });
  }
};

//send mail
const sendMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "email not null controller send mail" });
  }
  try {
    const existingGmail = await OTP.findOne({ email });

    if (existingGmail) {
      await OTP.findOneAndDelete({ email });
    }

    const otp = await generateOTP();

    //send mail
    await sendMails({ email, otp });

    //hash otp
    const hashOTP = await bcrypt.hash(otp, 10);

    const newOTP = new OTP({
      email,
      otp: hashOTP,
      createAt: new Date().toString(),
    });

    await newOTP.save();

    res.status(200).json({
      success: true,
      UserOtp: newOTP,
      message: "send mail truee controller",
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "send mail fail controller" });
  }
};

//check otp
const checkOTP = async (req, res) => {
  const { otp, email } = req.body;

  const userOTP = await OTP.findOne({ email });
  if (!userOTP) {
    return res
      .status(408)
      .json({ success: false, message: "email not null!!!!" });
  }

  try {
    const compareOTP = await bcrypt.compare(otp, userOTP.otp);

    res.status(200).json({
      success: true,
      OTP: compareOTP,
      message: `checkOTP ${compareOTP} controller`,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "check OTP not true controller" });
  }
};

//get all OTP
const getAllOTP = async (req, res) => {
  try {
    const data = await OTP.find();
    res.status(200).json({
      success: true,
      userOTP: data,
      message: " get all OTP  true controller",
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "get all OTP 0 fail controller" });
  }
};

//get one user otp
const getOneUSerOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(200)
      .json({ success: false, message: "Email not null get ont user OTP" });
  }
  try {
    const getOne = await OTP.findOne({ email });

    if (getOne) {
      res
        .status(200)
        .json({ success: true, data: getOne, message: "get ont true otp !!!" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "get ont user  OTP  fail controller" });
  }
};

//delete otp
const deleteOTP = async (req, res) => {
  const { id } = req.param;
  if (id === "") {
    return res.status(400).json({
      success: false,
      message: "id not null  delete OTP controller",
    });
  }
  try {
    const deleteData = await OTP.findOneAndUpdate({ id, otp: "" });
    if (deleteData) {
      res.status(200).json({
        success: true,
        data: deleteData,
        message: "Mã đã hết hạn. Bấm gửi lại để nhận lại mã",
      });
    }
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "delete  OTP  fail controller" });
  }
};

//forget password
const forgetPassword = async (req, res) => {
  const { email, password, rePassword } = req.body;

  if (email === "" || password === "" || rePassword === "") {
    return res
      .status(401)
      .json({ success: false, message: "data not null controller" });
  }

  if (password !== rePassword) {
    return res
      .status(402)
      .json({ success: false, message: "pass not = rePass controller" });
  }

  const checkEmail = await Users.findOne({ email });

  if (!checkEmail) {
    return res
      .status(400)
      .json({ success: false, message: "email not exist fail controller" });
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const newPass = await Users.findOneAndUpdate({
      email,
      password: hashPassword,
    });
    res.status(200).json({
      success: true,
      newPass: newPass,
      message: "forget pass  true controller",
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "forget pass  fail controller" });
  }
};

//check email
const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      return res.status(200).json({
        success: true,
        check: emailExist,
        message: "Mail đã tồn tại!",
      });
    }
    res.status(200).json({
      success: false,
      message: "Mail không tồn tại!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "check email fail controller",
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
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
};
