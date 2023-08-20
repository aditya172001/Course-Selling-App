import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type signupType = z.infer<typeof signupSchema>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type loginType = z.infer<typeof loginSchema>;
export declare const courseIdSchema: z.ZodEffects<z.ZodString, string, string>;
export type courseIdType = z.infer<typeof courseIdSchema>;
export declare const courseSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"">]>;
    imageURL: z.ZodString;
    isPublished: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number | "";
    imageURL: string;
    isPublished: boolean;
    _id?: string | undefined;
}, {
    title: string;
    description: string;
    price: number | "";
    imageURL: string;
    isPublished: boolean;
    _id?: string | undefined;
}>;
export type courseType = z.infer<typeof courseSchema>;
export declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    purchasedCourses: z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    purchasedCourses: string[];
}, {
    username: string;
    password: string;
    purchasedCourses: string[];
}>;
export type userType = z.infer<typeof userSchema>;
