require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access deined. No token provided.");
  }

  try {
    const jwtPayload = jwt.decode(token, process.env["jwtPrivateKey"]);
    req.user = jwtPayload;

    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
