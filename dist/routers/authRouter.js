"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validator_1 = require("../middlewares/validator");
const uploads_1 = require("../uploads");
const authRouter = express_1.default.Router();
authRouter.post('/login', validator_1.validateLogin, authController_1.login);
authRouter.post('/register', uploads_1.upload.single('ktp'), validator_1.validateRegister, authController_1.register);
authRouter.put('/forgotpassword', authController_1.forgotPassword);
authRouter.put('/changePassword/:token', authController_1.changePassword);
exports.default = authRouter;
