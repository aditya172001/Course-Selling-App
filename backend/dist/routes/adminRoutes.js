"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = require("../controller/adminController");
const adminAuthMiddleware_1 = require("../middlewares/adminAuthMiddleware");
// Admin Signup
router.post("/signup", adminController_1.adminSignup);
// Admin Login
router.post("/login", adminController_1.adminLogin);
// Admin authentication middleware
router.use(adminAuthMiddleware_1.validateAdminCredentials);
// Create A Course
router.post("/courses", adminController_1.createCourse);
// Update A Course
router.put("/courses/:courseId", adminController_1.updateCourse);
// Get All Courses
router.get("/courses", adminController_1.getAllCourses);
// Delete A Course
router.delete("/courses/:courseId", adminController_1.deleteCourse);
exports.default = router;
