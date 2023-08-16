import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
}> & {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
}> & {
    username: string;
    password: string;
    purchasedCourses: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
}>>;
