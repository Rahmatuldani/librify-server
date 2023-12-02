"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
function authorization(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return (0, response_1.default)(res, { status: 401, message: 'Authorization token is missing or invalid' });
    }
    const token = authHeader.replace('Bearer ', '');
    const validToken = 'secretpassword';
    if (token !== validToken) {
        return (0, response_1.default)(res, { status: 401, message: 'Invalid token' });
    }
    next();
}
exports.default = authorization;
