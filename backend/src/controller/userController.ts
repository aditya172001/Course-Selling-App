import { User } from "../models/user";
import { Course } from "../models/course";
import jwt from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
const userSceret = "asdfgh";

// User Controller Functions

export async function userSignup(req: Request, res: Response) {
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

export async function userLogin(req: Request, res: Response) {
  const { username, password } = req.body;
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

export async function getUserCourses(req: Request, res: Response) {
  try {
    const courses = await Course.find({ isPublished: true });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

interface MyRequest extends Request {
  user?: {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
  } & Document;
}

export async function purchaseCourse(req: MyRequest, res: Response) {
  const { user } = req;
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  try {
    if (!user) return res.status(401).json({ msg: "user not found" });
    user.purchasedCourses.push(courseId as unknown as mongoose.Types.ObjectId);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPurchasedCourses(req: MyRequest, res: Response) {
  const { user } = req;
  try {
    if (!user) return res.status(401).json({ msg: "user not found" });
    await user.populate("purchasedCourses");
    res.json(user.purchasedCourses || []);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
