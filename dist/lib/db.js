"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
let url = 'mongodb://20.2.89.234:27017/librify';
if (process.env.MONGODB_URI) {
    url = `${process.env.MONGODB_URI}`;
}
mongoose_1.default.connect(url);
const database = mongoose_1.default.connection;
database.on("error", console.error.bind(console, "❌ mongodb connection error"));
database.once("open", () => console.log("✅ mongodb connected successfully"));
mongoose_1.default.Promise = Promise;
