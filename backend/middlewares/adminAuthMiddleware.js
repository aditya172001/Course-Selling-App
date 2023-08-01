const jwt = require("jsonwebtoken");
const adminSecret = "qwerty";
const Admin = require("../models/admin");

async function validateAdminCredentials(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const credentials = jwt.verify(token, adminSecret);
    req.Admin = await Admin.findOne({ username: credentials.username });
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { validateAdminCredentials };
