import mongoose, { Document } from "mongoose";
import { Request, Response } from "express";
export declare function userSignup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function userLogin(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUserCourses(req: Request, res: Response): Promise<void>;
interface MyRequest extends Request {
    user?: {
        username: string;
        password: string;
        purchasedCourses: mongoose.Types.ObjectId[];
    } & Document;
}
export declare function purchaseCourse(req: MyRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getPurchasedCourses(req: MyRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
