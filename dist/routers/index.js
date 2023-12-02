"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter_1 = __importDefault(require("./bookRouter"));
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const borrowRouter_1 = __importDefault(require("./borrowRouter"));
const routers = express_1.default.Router();
routers.use('/auth', authRouter_1.default);
routers.use('/users', userRouter_1.default);
routers.use('/books', bookRouter_1.default);
routers.use('/borrows', borrowRouter_1.default);
exports.default = routers;
