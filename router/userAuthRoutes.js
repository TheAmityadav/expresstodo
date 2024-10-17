const express = require("express");
const router = express.Router();
const {
  signupFunc,
  loginFunc,
  homePage,
  logOut,
} = require("../controllers/userAuth");
const { authenticateJWT } = require("../auth/usertokensuth");

router.post("/signup", signupFunc);
router.post("/login", loginFunc);
router.post("/logout", logOut);
router.get("/home", authenticateJWT, homePage);

module.exports = router;
