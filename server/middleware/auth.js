const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const userId = jwt.verify(token, process.env.AUTH_KEY);
    const user = await User.findByPk(userId.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = authenticate;
