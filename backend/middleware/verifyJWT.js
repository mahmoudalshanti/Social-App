require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.username = decoded.UserInfo.username;
    req.id = decoded.UserInfo.id;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
