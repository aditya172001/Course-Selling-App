const jwt = require("jsonwebtoken");
const userSecret = "asdfgh";
const User = require("../models/user");

async function validateUserCredentials(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const credentials = jwt.verify(token, userSecret);
    req.User = await User.findOne({ username: credentials.username });
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { validateUserCredentials };
