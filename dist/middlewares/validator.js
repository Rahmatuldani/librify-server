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
exports.validateBorrow = exports.validateUpdateBook = exports.validateBook = exports.validateRegister = exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const response_1 = __importDefault(require("../utils/response"));
const book_1 = require("../models/book");
const validateLogin = [
    (0, express_validator_1.check)('email').not().isEmpty().withMessage('Email is required'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Please enter a valid email address')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.UserModel.findOne({ email: value });
        if (!user) {
            return Promise.reject('Email not found');
        }
    })),
    (0, express_validator_1.check)('password').not().isEmpty().withMessage('Password is required'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, response_1.default)(res, { status: 400, message: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateLogin = validateLogin;
const validateRegister = [
    (0, express_validator_1.check)('name').not().isEmpty().withMessage('Name is required'),
    (0, express_validator_1.check)('email').not().isEmpty().withMessage('Email is required'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Please enter a valid email address')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.UserModel.findOne({ email: value });
        if (user) {
            return Promise.reject('Email already exist');
        }
    })),
    (0, express_validator_1.check)('password').not().isEmpty().withMessage('Password is required'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, response_1.default)(res, { status: 400, message: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateRegister = validateRegister;
const validateBook = [
    (0, express_validator_1.body)('isbn').not().isEmpty().withMessage('ISBN is required')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield book_1.BookModel.findOne({ isbn: value });
        if (book) {
            return Promise.reject('Book already exist');
        }
    })),
    (0, express_validator_1.check)('year').not().isEmpty().withMessage('Year is required'),
    (0, express_validator_1.check)('year').isNumeric().withMessage('Year must be a number'),
    (0, express_validator_1.check)('title').not().isEmpty().withMessage('Email is required'),
    (0, express_validator_1.check)('genre').not().isEmpty().withMessage('Genre is required'),
    (0, express_validator_1.check)('author').not().isEmpty().withMessage('Author is required'),
    (0, express_validator_1.check)('publisher').not().isEmpty().withMessage('Publisher is required'),
    (0, express_validator_1.check)('desc').not().isEmpty().withMessage('Description is required'),
    (0, express_validator_1.check)('price').not().isEmpty().withMessage('Price is required'),
    (0, express_validator_1.check)('price').isNumeric().withMessage('Price must be a number'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, response_1.default)(res, { status: 400, message: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateBook = validateBook;
const validateUpdateBook = [
    (0, express_validator_1.check)('isbn').not().isEmpty().withMessage('ISBN is required'),
    (0, express_validator_1.check)('isbn').isNumeric().withMessage('ISBN must be a number'),
    (0, express_validator_1.check)('year').not().isEmpty().withMessage('Year is required'),
    (0, express_validator_1.check)('year').isNumeric().withMessage('Year must be a number'),
    (0, express_validator_1.check)('title').not().isEmpty().withMessage('Email is required'),
    (0, express_validator_1.check)('genre').not().isEmpty().withMessage('Genre is required'),
    (0, express_validator_1.check)('author').not().isEmpty().withMessage('Author is required'),
    (0, express_validator_1.check)('publisher').not().isEmpty().withMessage('Publisher is required'),
    (0, express_validator_1.check)('desc').not().isEmpty().withMessage('Description is required'),
    (0, express_validator_1.check)('price').not().isEmpty().withMessage('Price is required'),
    (0, express_validator_1.check)('price').isNumeric().withMessage('Price must be a number'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, response_1.default)(res, { status: 400, message: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateUpdateBook = validateUpdateBook;
const validateBorrow = [
    (0, express_validator_1.check)('userId').not().isEmpty().withMessage('User ID is required'),
    (0, express_validator_1.check)('bookId').not().isEmpty().withMessage('Book ID is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, response_1.default)(res, { status: 400, message: errors.array()[0].msg });
        }
        next();
    }
];
exports.validateBorrow = validateBorrow;
