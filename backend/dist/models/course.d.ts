import mongoose from "mongoose";
export declare const Course: mongoose.Model<{
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
}> & {
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
}, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
}> & {
    title: string;
    description: string;
    price: number;
    imageURL: string;
    isPublished: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
