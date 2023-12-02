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
exports.changePassword = exports.forgotPassword = exports.register = exports.login = void 0;
const email_1 = require("../config/email");
const user_1 = require("../models/user");
const encrypt_1 = require("../utils/encrypt");
const response_1 = __importDefault(require("../utils/response"));
const uuid_1 = require("uuid");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const encryptPassword = (0, encrypt_1.Encrypt)(password);
        if (!req.file) {
            return (0, response_1.default)(res, { status: 400, message: 'ktp is required' });
        }
        try {
            const token = (0, uuid_1.v4)();
            yield user_1.UserModel.create({
                name,
                email,
                password: encryptPassword,
                ktp: req.file.filename,
                verificationToken: token
            });
            const HOST = process.env.APP_HOST || 'http://20.2.89.234';
            const PORT = process.env.PORT || 5000;
            const verifyLink = `${HOST}:${PORT}/api/users/verify?token=${token}`;
            yield (0, email_1.sendVerification)(email, verifyLink);
            return (0, response_1.default)(res, { message: 'Register success, Check your email for verification instructions.' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `${error}` });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ email });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            if (!(user === null || user === void 0 ? void 0 : user.verified)) {
                return (0, response_1.default)(res, { status: 400, message: 'Your account not verified. Please check your email' });
            }
            if (!(user === null || user === void 0 ? void 0 : user.adminVerified)) {
                return (0, response_1.default)(res, { status: 400, message: 'Your account not verified by administrator. Please contact administrator' });
            }
            const encryptPassword = (0, encrypt_1.Encrypt)(password);
            if ((user === null || user === void 0 ? void 0 : user.password) !== encryptPassword) {
                return (0, response_1.default)(res, { status: 400, message: 'Password is incorrect' });
            }
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            };
            return (0, response_1.default)(res, { message: 'Login success', data: { user: userData } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Login failed ${error}` });
        }
    });
}
exports.login = login;
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        if (!email) {
            return (0, response_1.default)(res, { status: 400, message: 'Email is required' });
        }
        try {
            const user = yield user_1.UserModel.findOne({ email: email });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            const token = (0, uuid_1.v4)();
            user.verificationToken = token;
            yield user.save();
            const HOST = 'http://localhost';
            const PORT = 5173;
            const verifyLink = `${HOST}:${PORT}/api/auth/forgotpassword?token=${token}`;
            yield (0, email_1.sendVerification)(email, verifyLink);
            return (0, response_1.default)(res, { message: 'Forgot password success, Check your email for change password instructions.' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Forgot password failed ${error}` });
        }
    });
}
exports.forgotPassword = forgotPassword;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.params;
        const { password } = req.body;
        try {
            const user = yield user_1.UserModel.findOne({ verificationToken: token });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'Invalid token' });
            }
            const encryptPass = (0, encrypt_1.Encrypt)(password);
            user.password = encryptPass;
            return (0, response_1.default)(res, { message: 'Change password success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Change password failed ${error}` });
        }
    });
}
exports.changePassword = changePassword;
