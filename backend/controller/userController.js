const User = require("../models/user");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");
const userSceret = "asdfgh";

// User Controller Functions

async function userSignup(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

async function userLogin(req, res) {
  const { username, password } = req.headers;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = { username };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, userSceret, options);
    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserCourses(req, res) {
  try {
    const courses = await Course.find({ published: true });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function purchaseCourse(req, res) {
  const { User } = req;
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  try {
    User.purchasedCourses.push(courseId);
    await User.save();
    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getPurchasedCourses(req, res) {
  const { User } = req;
  try {
    await User.populate("purchasedCourses");
    res.json(User.purchasedCourses || []);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  userSignup,
  userLogin,
  getUserCourses,
  purchaseCourse,
  getPurchasedCourses,
};
