const jwt = require("jsonwebtoken");
const SECRET = "itsamit$#yadav";

const generateToken = (user) => {
  payload = {
    id: user.id,
    email: user.email,
  };
  console.log(user.id);
  console.log(user.email);
  return jwt.sign(payload, SECRET, { expiresIn: "10min" });
};

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    req.userId = req.user.id;
    next();
  });
};

module.exports = { generateToken, authenticateJWT };
