import { body, check, validationResult } from "express-validator";
import { UserModel } from "../models/user";
import response from "../utils/response";
import { BookModel } from "../models/book";

const validateLogin = [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Please enter a valid email address')
    .custom(async (value) => {
        const user = await UserModel.findOne({ email: value });
        if (!user) {
            return Promise.reject('Email not found')
        }
    }),

    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, { status: 400, message: errors.array()[0].msg })
        }
        next();
    }
]

const validateRegister = [
    check('name').not().isEmpty().withMessage('Name is required'),

    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Please enter a valid email address')
    .custom(async (value) => {
        const user = await UserModel.findOne({ email: value });
        if (user) {
            return Promise.reject('Email already exist')
        }
    }),

    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, { status: 400, message: errors.array()[0].msg })
        }
        next();
    }
]

const validateBook = [
    body('isbn').not().isEmpty().withMessage('ISBN is required')
    .custom(async (value) => {
        const book = await BookModel.findOne({ isbn: value });
        if (book) {
            return Promise.reject('Book already exist')
        }
    }),

    check('year').not().isEmpty().withMessage('Year is required'),
    check('year').isNumeric().withMessage('Year must be a number'),
    
    check('title').not().isEmpty().withMessage('Email is required'),
    check('genre').not().isEmpty().withMessage('Genre is required'),
    check('author').not().isEmpty().withMessage('Author is required'),
    check('publisher').not().isEmpty().withMessage('Publisher is required'),
    check('desc').not().isEmpty().withMessage('Description is required'),

    check('price').not().isEmpty().withMessage('Price is required'),
    check('price').isNumeric().withMessage('Price must be a number'),

    check('stock').not().isEmpty().withMessage('Stock is required'),
    check('stock').isNumeric().withMessage('Stock must be a number'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, { status: 400, message: errors.array()[0].msg })
        }
        next();
    }
]

const validateUpdateBook = [
    check('isbn').not().isEmpty().withMessage('ISBN is required'),
    check('isbn').isNumeric().withMessage('ISBN must be a number'),

    check('year').not().isEmpty().withMessage('Year is required'),
    check('year').isNumeric().withMessage('Year must be a number'),
    
    check('title').not().isEmpty().withMessage('Email is required'),
    check('genre').not().isEmpty().withMessage('Genre is required'),
    check('author').not().isEmpty().withMessage('Author is required'),
    check('publisher').not().isEmpty().withMessage('Publisher is required'),
    check('desc').not().isEmpty().withMessage('Description is required'),

    check('price').not().isEmpty().withMessage('Price is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, { status: 400, message: errors.array()[0].msg })
        }
        next();
    }
]

const validateBorrow = [
    check('userId').not().isEmpty().withMessage('User ID is required'),

    check('books').not().isEmpty().withMessage('Books is required'),
    check('books').isArray().withMessage('Books must be an array'),
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response(res, { status: 400, message: errors.array()[0].msg })
        }
        next();
    }
]

export {
    validateLogin,
    validateRegister,
    validateBook,
    validateUpdateBook,
    validateBorrow,
}