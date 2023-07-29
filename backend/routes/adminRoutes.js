const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const {
  validateAdminCredentials,
} = require("../middlewares/adminAuthMiddleware");

// Admin Signup
router.post("/signup", adminController.adminSignup);

// Admin Login
router.post("/login", adminController.adminLogin);

// Admin authentication middleware
router.use(validateAdminCredentials);

// Create Course
router.post("/courses", adminController.createCourse);

// Update Course
router.put("/courses/:courseId", adminController.updateCourse);

// Get All Courses
router.get("/courses", adminController.getAllCourses);

module.exports = router;
