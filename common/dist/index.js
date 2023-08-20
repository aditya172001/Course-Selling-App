"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.courseSchema = exports.courseIdSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.courseIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});
exports.courseSchema = zod_1.z.object({
    _id: exports.courseIdSchema.optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    imageURL: zod_1.z.string().url(),
    isPublished: zod_1.z.boolean(),
});
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    purchasedCourses: zod_1.z.array(exports.courseIdSchema),
});
