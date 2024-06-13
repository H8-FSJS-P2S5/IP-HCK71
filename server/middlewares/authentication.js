const { User } = require("../models/index.js");
const { verifyToken } = require("../helpers/jsonwebtoken.js");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "InvalidToken" };
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "InvalidToken" };
    const { id } = verifyToken(token);
    const oneUser = await User.findByPk(id);
    if (!oneUser) throw { name: "InvalidToken" };
    req.user = oneUser;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };
