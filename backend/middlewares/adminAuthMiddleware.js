const jwt = require("jsonwebtoken");
const adminSecret = "qwerty";
const Admin = require("../models/admin");

async function validateAdminCredentials(req, res, next) {
  // let person = req.path.split("/")[1]; //person is user or admin
  if (
    req.path.startsWith(`/admin/signup`) ||
    req.path.startsWith(`/admin/login`)
  )
    next();
  else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const credentials = jwt.verify(token, adminSecret);
      req.Admin = await Admin.findOne({ username: credentials.username });
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

module.exports = { validateAdminCredentials };
