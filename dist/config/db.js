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
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
let url = '';
if (!process.env.MONGODB_URI) {
    url = 'mongodb://20.2.89.234:27017/librify';
}
else {
    url = process.env.MONGODB_URI;
}
mongoose_1.default.connect(url);
const database = mongoose_1.default.connection;
database.on('error', console.error.bind(console, '❌ mongodb connection error'));
database.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    const collection = database.collection('users');
    const defaultDataExist = yield collection.findOne({ email: 'admin@gmail.com' });
    if (!defaultDataExist) {
        yield collection.insertMany([
            {
                name: 'Administrator',
                role: 'admin',
                email: 'admin@gmail.com',
                password: 'apB0ZF415Z+/IVEeElWKs91oOGAXQrAnPrzPjq5h9P7KI1OqX7TnzXsEj2Df1eEQkGz3V3p99a4mboFDpBIrnA==',
                avatar: null,
                ktp: '',
                verified: true,
                adminVerified: true,
                verificationToken: '',
                createdAt: '2023-12-02T03:43:38.363Z',
                updatedAt: '2023-12-02T03:44:15.150Z'
            },
            {
                name: 'Testing',
                role: 'user',
                email: 'testing@gmail.com',
                password: 'apB0ZF415Z+/IVEeElWKs91oOGAXQrAnPrzPjq5h9P7KI1OqX7TnzXsEj2Df1eEQkGz3V3p99a4mboFDpBIrnA==',
                avatar: null,
                ktp: '',
                verified: true,
                adminVerified: true,
                verificationToken: '',
                createdAt: '2023-12-02T03:43:38.363Z',
                updatedAt: '2023-12-02T03:44:15.150Z'
            }
        ]);
    }
    console.log('✅ mongodb connected successfully');
}));
mongoose_1.default.Promise = Promise;
