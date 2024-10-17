const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../auth/usertokensuth");
const jwt = require("jsonwebtoken");

const signupFunc = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!email || !password) {
    return res.status(401).json({ message: "All Data Required" });
  }
  if (checkUser) {
    return res.status(401).json({ message: "User Already Exists" });
  }
  const hashpass = await bcrypt.hash(password, 10);
  const newuser = await User.create({ email, password: hashpass });
  res.status(200).json({ message: "Signup Success", newuser });
};

const loginFunc = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(301).json({ message: "USer not Exist" });
  }
  const checkpass = await bcrypt.compare(password, checkUser.password);
  if (!checkpass) {
    return res.status(401).json({ message: "Password is incorrect" });
  }
  if (email === checkUser.email && checkpass) {
    const token = generateToken({ id: checkUser._id, email: checkUser.email });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    res.status(200).json({ message: "Login success" });
  }
};

const logOut = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);
  res.clearCookie("authtoken");
  res.status(200).json({ message: "Logout Success" });
};

const homePage = (req, res) => {
  res.json({ message: "hello from home" });
};

module.exports = { signupFunc, loginFunc, homePage, logOut };
