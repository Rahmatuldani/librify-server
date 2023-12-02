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
exports.sendVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
var emailTransport = nodemailer_1.default.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0dcea2ff7850ca",
        pass: "0e4d7ada31f948"
    }
});
function sendVerification(email, verificationLink) {
    return __awaiter(this, void 0, void 0, function* () {
        yield emailTransport.sendMail({
            from: 'admin@gmail.com',
            to: email,
            subject: 'Verify Your Account',
            html: `<p>Click the following link to verify your account: <a href='${verificationLink}'>${verificationLink}</a></p>`,
        });
    });
}
exports.sendVerification = sendVerification;
