"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const userAuthMiddleware_1 = require("../middlewares/userAuthMiddleware");
router.post("/signup", userController_1.userSignup);
router.post("/login", userController_1.userLogin);
router.use(userAuthMiddleware_1.validateUserCredentials);
router.get("/courses", userController_1.getUserCourses);
router.post("/courses/:courseId", userController_1.purchaseCourse);
router.get("/purchasedCourses", userController_1.getPurchasedCourses);
exports.default = router;
