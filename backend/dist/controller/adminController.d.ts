import { Request, Response } from "express";
export declare function adminSignup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function adminLogin(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createCourse(req: Request, res: Response): Promise<void>;
export declare function updateCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getAllCourses(req: Request, res: Response): Promise<void>;
export declare function deleteCourse(req: Request, res: Response): Promise<void>;
