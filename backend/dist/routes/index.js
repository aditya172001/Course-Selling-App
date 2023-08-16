"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.default.Router();
router.use("/admin", adminRoutes_1.default);
router.use("/user", userRoutes_1.default);
exports.default = router;
