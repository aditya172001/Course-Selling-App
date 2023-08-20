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
exports.getPurchasedCourses = exports.purchaseCourse = exports.getUserCourses = exports.userLogin = exports.userSignup = void 0;
const user_1 = require("../models/user");
const course_1 = require("../models/course");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const courselling_types_1 = require("@adityakumar172001/courselling_types");
const userSceret = "asdfgh";
function userSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate request body using signupSchema
            const parsed = courselling_types_1.signupSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(401).json({ message: "Unauthorized" });
            const { username, password } = parsed.data;
            // Check if user with the same username already exists
            const user = yield user_1.User.findOne({ username });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            // Create a new user
            const newUser = new user_1.User({ username, password });
            yield newUser.save();
            res.json({ message: "User created successfully" });
        }
        catch (err) {
            res.status(400).json({ message: "Invalid data" });
        }
    });
}
exports.userSignup = userSignup;
function userLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate request body using loginSchema
            const parsed = courselling_types_1.loginSchema.safeParse(req.body);
            if (!parsed.success)
                return res.status(401).json({ message: "Unauthorized" });
            const { username, password } = parsed.data;
            // Check user's credentials
            const user = yield user_1.User.findOne({ username, password });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Create JWT token
            const payload = { username };
            const options = { expiresIn: "1h" };
            const token = jsonwebtoken_1.default.sign(payload, userSceret, options);
            res.json({ message: "Logged in successfully", token });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.userLogin = userLogin;
function getUserCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield course_1.Course.find({ isPublished: true });
            res.json(courses);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getUserCourses = getUserCourses;
function purchaseCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate courseId from params
            const parsedCourseId = courselling_types_1.courseIdSchema.safeParse(req.params.courseId);
            if (!parsedCourseId.success)
                return res.status(400).json({ message: "Bad Request" });
            const courseId = parsedCourseId.data;
            // Check if course exists
            const course = yield course_1.Course.findById(courseId);
            if (!course)
                return res.status(400).json({ message: "Invalid courseId" });
            const { user } = req;
            if (!user)
                return res.status(401).json({ msg: "user not found" });
            // Update user's purchasedCourses
            user.purchasedCourses.push(courseId);
            yield user.save();
            res.json({ message: "Course purchased successfully" });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.purchaseCourse = purchaseCourse;
function getPurchasedCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        try {
            if (!user)
                return res.status(401).json({ msg: "user not found" });
            yield user.populate("purchasedCourses");
            res.json(user.purchasedCourses || []);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getPurchasedCourses = getPurchasedCourses;
