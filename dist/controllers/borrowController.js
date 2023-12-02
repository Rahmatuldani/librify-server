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
exports.deleteBorrow = exports.addBorrow = exports.getBorrow = void 0;
const borrow_1 = require("../models/borrow");
const response_1 = __importDefault(require("../utils/response"));
function getBorrow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { id } = req.params;
        try {
            const borrow = yield borrow_1.BorrowModel.find()
                .populate({
                path: 'user',
                select: 'name'
            })
                .populate('book');
            return (0, response_1.default)(res, { message: 'Get borrow success', data: borrow });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Get borrow failed ${error}` });
        }
    });
}
exports.getBorrow = getBorrow;
function addBorrow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, bookId, quantity } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        try {
            const borrow = yield borrow_1.BorrowModel.create({
                user: userId,
                book: bookId,
                quantity: quantity,
                date: today
            });
            return (0, response_1.default)(res, { message: `Add borrow success`, data: borrow });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Add borrow failed ${error}` });
        }
    });
}
exports.addBorrow = addBorrow;
function deleteBorrow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield borrow_1.BorrowModel.deleteMany();
            return (0, response_1.default)(res, { message: 'Delete borrow success' });
        }
        catch (error) {
            return (0, response_1.default)(res, { status: 500, message: `Delete borrow failed ${error}` });
        }
    });
}
exports.deleteBorrow = deleteBorrow;
