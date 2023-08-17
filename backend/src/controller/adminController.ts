import { Admin } from "../models/admin";
import { Course } from "../models/course";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const adminSceret = "qwerty";

export async function adminSignup(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function adminLogin(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = { username };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, adminSceret, options);
    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createCourse(req: Request, res: Response) {
  const newCourse = new Course(req.body);
  try {
    await newCourse.save();
    res.json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  const { courseId } = req.params;
  try {
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  const { courseId } = req.params;
  try {
    const courses = await Course.findByIdAndDelete(courseId);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}