const express = require("express");
const router = express.Router();
const { signupFunc, loginFunc, logOut } = require("../controllers/userAuth");

router.post("/signup", signupFunc);
router.post("/login", loginFunc);
router.post("/logout", logOut);

module.exports = router;
