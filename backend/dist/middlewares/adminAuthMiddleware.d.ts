import { Request, Response, NextFunction } from "express";
export declare function validateAdminCredentials(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
