"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.getAllCourses = exports.updateCourse = exports.createCourse = exports.adminLogin = exports.adminSignup = void 0;
const admin_1 = require("../models/admin");
const course_1 = require("../models/course");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const courselling_types_1 = require("@adityakumar172001/courselling_types");
const adminSceret = "qwerty";
function adminSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate request body using signupSchema
            const parsed = courselling_types_1.signupSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(401).json({ message: "Unauthorized" });
            const { username, password } = parsed.data;
            // Check if admin with the same username already exists
            const admin = yield admin_1.Admin.findOne({ username });
            if (admin) {
                return res.status(409).json({ message: "User already exists" });
            }
            // Create a new admin
            const newAdmin = new admin_1.Admin({ username, password });
            yield newAdmin.save();
            res.json({ message: "Admin created successfully" });
        }
        catch (err) {
            res.status(400).json({ message: "Invalid data" });
        }
    });
}
exports.adminSignup = adminSignup;
function adminLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate request body using loginSchema
            const parsed = courselling_types_1.loginSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(401).json({ message: "Unauthorized" });
            const { username, password } = parsed.data;
            // Check admin's credentials
            const admin = yield admin_1.Admin.findOne({ username, password });
            if (!admin) {
                return res.status(404).json({ message: "User not found" });
            }
            // Create JWT token
            const payload = { username };
            const options = { expiresIn: "1h" };
            const token = jsonwebtoken_1.default.sign(payload, adminSceret, options);
            res.json({ message: "Logged in successfully", token });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.adminLogin = adminLogin;
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate request body using courseSchema
            const parsed = courselling_types_1.courseSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(400).json({ message: "Invalid data" });
            const newCourse = new course_1.Course(parsed.data);
            // Save the new course
            yield newCourse.save();
            res.json({
                message: "Course created successfully",
                courseId: newCourse._id,
            });
        }
        catch (err) {
            res.status(400).json({ message: "Invalid data" });
        }
    });
}
exports.createCourse = createCourse;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate courseId from params
            const parsedCourseId = courselling_types_1.courseIdSchema.safeParse(req.params.courseId);
            if (!parsedCourseId.success)
                return res.status(400).json({ message: "Bad Request" });
            const courseId = parsedCourseId.data;
            // Validate course data from body
            const parsedCourseData = courselling_types_1.courseSchema.safeParse(req.body);
            if (!parsedCourseData.success)
                return res.status(400).json({ message: "Invalid data" });
            // Update the course
            const course = yield course_1.Course.findByIdAndUpdate(courseId, parsedCourseData.data, {
                new: true,
                runValidators: true,
            });
            // Handle course not found
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            res.json({ message: "Course updated successfully" });
        }
        catch (err) {
            res.status(400).json({ message: "Invalid data" });
        }
    });
}
exports.updateCourse = updateCourse;
function getAllCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield course_1.Course.find();
            res.json(courses);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getAllCourses = getAllCourses;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate courseId from params
            const parsedCourseId = courselling_types_1.courseIdSchema.safeParse(req.params.courseId);
            if (!parsedCourseId.success)
                return res.status(400).json({ message: "Bad Request" });
            const courseId = parsedCourseId.data;
            // Delete the course
            const courses = yield course_1.Course.findByIdAndDelete(courseId);
            res.json({ message: "Course deleted successfully" });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.deleteCourse = deleteCourse;
