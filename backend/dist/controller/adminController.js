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
const adminSceret = "qwerty";
function adminSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const admin = yield admin_1.Admin.findOne({ username });
            if (admin) {
                return res.status(400).json({ message: "User already exists" });
            }
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
        const { username, password } = req.body;
        try {
            const admin = yield admin_1.Admin.findOne({ username, password });
            if (!admin) {
                return res.status(404).json({ message: "User not found" });
            }
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
        const newCourse = new course_1.Course(req.body);
        try {
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
        const { courseId } = req.params;
        try {
            const course = yield course_1.Course.findByIdAndUpdate(courseId, req.body, {
                new: true,
                runValidators: true,
            });
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
        const { courseId } = req.params;
        try {
            const courses = yield course_1.Course.findByIdAndDelete(courseId);
            res.json({ message: "Course deleted successfully" });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.deleteCourse = deleteCourse;
