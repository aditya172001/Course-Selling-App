import mongoose, { Document } from "mongoose";
import { Request, Response, NextFunction } from "express";
interface MyRequest extends Request {
    user?: {
        username: string;
        password: string;
        purchasedCourses: mongoose.Types.ObjectId[];
    } & Document;
}
export declare function validateUserCredentials(req: MyRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export {};
