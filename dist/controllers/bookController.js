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
exports.changePoster = exports.updateBook = exports.getPoster = exports.deleteBook = exports.createBook = exports.searchBooks = exports.getPages = exports.getBooks = void 0;
const book_1 = require("../models/book");
const response_1 = __importDefault(require("../utils/response"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pageSize = 5;
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page } = req.query;
        if (!page) {
            return (0, response_1.default)(res, { status: 400, message: 'Need page query' });
        }
        try {
            const books = yield book_1.BookModel.find().skip((page - 1) * pageSize).limit(pageSize);
            return (0, response_1.default)(res, { message: 'Get books success', data: { books } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get books failed ${error}` });
        }
    });
}
exports.getBooks = getBooks;
function getPages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield book_1.BookModel.countDocuments();
            const pages = Math.ceil(books / pageSize);
            return (0, response_1.default)(res, { message: 'Get pages success', data: { pages } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get pages failed ${error}` });
        }
    });
}
exports.getPages = getPages;
function searchBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { search } = req.params;
        try {
            const books = yield book_1.BookModel.find({
                $or: [
                    { title: search },
                    { author: search }
                ]
            });
            if (!books) {
                return (0, response_1.default)(res, { status: 404, message: 'Book not found' });
            }
            return (0, response_1.default)(res, { message: 'Get book success', data: { books } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get pages failed ${error}` });
        }
    });
}
exports.searchBooks = searchBooks;
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { isbn, year, title, genre, author, publisher, desc, price, } = req.body;
        if (!req.file || req.file.fieldname !== 'poster') {
            return (0, response_1.default)(res, { status: 400, message: 'Poster is required' });
        }
        try {
            const book = yield book_1.BookModel.create({
                isbn, year, title, genre, author, publisher, desc, price, poster: req.file.filename
            });
            return (0, response_1.default)(res, { message: 'Create book success', data: { book } });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Create book failed ${error}` });
        }
    });
}
exports.createBook = createBook;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const book = yield book_1.BookModel.findById(id);
            if (!book) {
                return (0, response_1.default)(res, { status: 404, message: 'Book not found' });
            }
            const ktpPath = path_1.default.join(__dirname, '../uploads/poster', book.poster);
            if (fs_1.default.existsSync(ktpPath)) {
                fs_1.default.unlink(ktpPath, (err) => {
                    if (err) {
                        return (0, response_1.default)(res, { status: 500, message: `${err}` });
                    }
                });
            }
            yield book_1.BookModel.findByIdAndDelete(id);
            return (0, response_1.default)(res, { message: 'Delete book success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Delete book failed ${error}` });
        }
    });
}
exports.deleteBook = deleteBook;
function getPoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const file = path_1.default.join(__dirname, '../uploads/poster/', id);
            if (!file) {
                return (0, response_1.default)(res, { status: 404, message: 'File not found' });
            }
            return res.sendFile(file);
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get book poster failed ${error}` });
        }
    });
}
exports.getPoster = getPoster;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const book = yield book_1.BookModel.findOne({ _id: id });
            if (!book) {
                return (0, response_1.default)(res, { status: 404, message: 'Book not found' });
            }
            yield book_1.BookModel.findByIdAndUpdate({ _id: id }, req.body);
            return (0, response_1.default)(res, { message: 'Update book success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Update book failed ${error}` });
        }
    });
}
exports.updateBook = updateBook;
function changePoster(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const book = yield book_1.BookModel.findOne({ _id: id });
            if (!book) {
                return (0, response_1.default)(res, { status: 404, message: 'Book not found' });
            }
            const file = path_1.default.join(__dirname, '../uploads/poster/', book.poster);
            if (fs_1.default.existsSync(file)) {
                fs_1.default.unlink(file, (err) => {
                    if (err) {
                        return (0, response_1.default)(res, { status: 500, message: `${err}` });
                    }
                });
            }
            book.poster = req.file.filename;
            yield book.save();
            return (0, response_1.default)(res, { message: 'Change poster success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Change poster failed ${error}` });
        }
    });
}
exports.changePoster = changePoster;
