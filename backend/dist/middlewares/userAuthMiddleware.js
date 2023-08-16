"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserCredentials = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const userSecret = "asdfgh";
function validateUserCredentials(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.headers.authorization === undefined)
                return res.status(401).json({ message: "Unauthorized" });
            const token = req.headers.authorization.split(" ")[1];
            const credentials = jsonwebtoken_1.default.verify(token, userSecret);
            if (typeof credentials === "string")
                return res.status(401).json({ message: "Unauthorized" });
            const user = yield user_1.User.findOne({ username: credentials.username });
            if (user === null)
                return res.status(401).json({ message: "Unauthorized" });
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}
exports.validateUserCredentials = validateUserCredentials;
