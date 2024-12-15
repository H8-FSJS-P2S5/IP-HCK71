const jsonwebtoken = require("jsonwebtoken");

function createToken(payload) {
  return jsonwebtoken.sign(payload, process.env.JSONWEBTOKEN_SECRET, {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, process.env.JSONWEBTOKEN_SECRET);
}

module.exports = { createToken, verifyToken };
