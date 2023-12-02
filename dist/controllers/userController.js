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
exports.changeAvatar = exports.verifyAdmin = exports.verifyEmail = exports.updatePassword = exports.getKtp = exports.getAvatar = exports.deleteUsers = exports.getUsers = void 0;
const user_1 = require("../models/user");
const encrypt_1 = require("../utils/encrypt");
const response_1 = __importDefault(require("../utils/response"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function verifyEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.query;
        try {
            const user = yield user_1.UserModel.findOne({ verificationToken: token });
            if (!user) {
                return (0, response_1.default)(res, { status: 400, message: 'Invalid verification token' });
            }
            user.verified = true;
            user.verificationToken = '';
            yield user.save();
            return res.redirect('http://localhost:5173/login');
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Verify user failed ${error}` });
        }
    });
}
exports.verifyEmail = verifyEmail;
function verifyAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield user_1.UserModel.findOne({ _id: id });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            user.adminVerified = true;
            yield user.save();
            return (0, response_1.default)(res, { message: 'Verify success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Verify user failed ${error}` });
        }
    });
}
exports.verifyAdmin = verifyAdmin;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_1.UserModel.find().select('-password -createdAt -updatedAt -ktp');
            return (0, response_1.default)(res, { message: 'Get users success', data: { users } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get users failed : ${error}` });
        }
    });
}
exports.getUsers = getUsers;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { password, newPassword } = req.body;
        if (!password || !newPassword) {
            return (0, response_1.default)(res, { status: 400, message: 'password and newPassword required' });
        }
        try {
            const encryptPass = (0, encrypt_1.Encrypt)(password);
            const encryptNewPass = (0, encrypt_1.Encrypt)(newPassword);
            const user = yield user_1.UserModel.findOne({ _id: id });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            if (user.password !== encryptPass) {
                return (0, response_1.default)(res, { status: 400, message: 'User password is incorrect' });
            }
            user.password = encryptNewPass;
            yield user.save();
            return (0, response_1.default)(res, { message: 'Update user success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Update user password failed : ${error}` });
        }
    });
}
exports.updatePassword = updatePassword;
function deleteUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield user_1.UserModel.findById(id);
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            const ktpPath = path_1.default.join(__dirname, '../uploads/ktp', user.ktp);
            if (fs_1.default.existsSync(ktpPath)) {
                fs_1.default.unlink(ktpPath, (err) => {
                    if (err) {
                        return (0, response_1.default)(res, { status: 500, message: `${err}` });
                    }
                });
            }
            yield user_1.UserModel.findByIdAndDelete(id);
            return (0, response_1.default)(res, { message: 'Delete users success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Delete users failed ${error}` });
        }
    });
}
exports.deleteUsers = deleteUsers;
function getAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const file = path_1.default.join(__dirname, '../uploads/avatar/', id);
            if (!file) {
                return (0, response_1.default)(res, { status: 404, message: 'File not found' });
            }
            return res.sendFile(file);
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get user avatar failed ${error}` });
        }
    });
}
exports.getAvatar = getAvatar;
function getKtp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const file = path_1.default.join(__dirname, '../uploads/ktp/', id);
            if (!file) {
                return (0, response_1.default)(res, { status: 404, message: 'File not found' });
            }
            return res.sendFile(file);
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get user avatar failed ${error}` });
        }
    });
}
exports.getKtp = getKtp;
function changeAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            return (0, response_1.default)(res, { status: 400, message: 'User ID is required' });
        }
        try {
            const user = yield user_1.UserModel.findOne({ _id: id });
            if (!user) {
                return (0, response_1.default)(res, { status: 404, message: 'User not found' });
            }
            if (user.avatar !== null) {
                const file = path_1.default.join(__dirname, '../uploads/avatar/', user.avatar);
                if (fs_1.default.existsSync(file)) {
                    fs_1.default.unlink(file, (err) => {
                        if (err) {
                            return (0, response_1.default)(res, { status: 500, message: `${err}` });
                        }
                    });
                }
            }
            user.avatar = req.file.filename;
            yield user.save();
            return (0, response_1.default)(res, { message: 'Change avatar success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Change avatar failed ${error}` });
        }
    });
}
exports.changeAvatar = changeAvatar;
