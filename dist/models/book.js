"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    isbn: {
        type: Number,
        unique: true,
    },
    year: Number,
    title: String,
    genre: [String],
    author: [String],
    publisher: String,
    desc: String,
    price: Number,
    poster: String,
}, {
    versionKey: false,
    timestamps: true,
});
const BookModel = mongoose_1.default.model("Book", BookSchema);
exports.BookModel = BookModel;
