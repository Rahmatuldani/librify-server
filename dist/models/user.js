"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    role: {
        type: String,
        default: 'user',
    },
    email: String,
    password: String,
    avatar: {
        type: String,
        default: null
    },
    ktp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    adminVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
}, {
    versionKey: false,
    timestamps: true,
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
