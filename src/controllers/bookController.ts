import fs from 'fs';
import { BookModel, IBook } from "../models/book"
import response from "../utils/response";
import path from 'path';
import { validationResult } from 'express-validator';

async function getBooks(req: any, res:any) {
    try {
        const books: IBook[] = await BookModel.find();
        return response(res, { message: 'Get books success', data: {books} })

    } catch (error) {
        return response(res, { status: 500, message: `Get books failed ${error}` })
    }
}

async function createBook(req: any, res: any) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return response(res, { status: 400, message: `Error validation : ${err.array()[0].msg}` })
    }

    const {
        isbn, year, title, genre, author, publisher, desc, price,
    } = req.body;

    // const file = req.file;

    // if (!file || file.fieldname !== 'poster') {
    //     return response(res, { status: 400, message: 'Poster is required' })
    // }

    try {
        const book = await BookModel.create({
            isbn, year, title, genre, author, publisher, desc, price
        })

        return response(res, { message: 'Create book success', data: {book} })
    } catch (error) {
        return response(res, { status: 500, message: `Create book failed ${error}` })
    }
}

async function deleteBook(req: any, res: any) {
    try {
        await BookModel.deleteMany();
        return response(res, { message: 'Delete book success' })
    } catch (error) {
        return response(res, { status: 500, message: `Delete book failed ${error}` })
    }
}

export {
    getBooks,
    createBook,
    deleteBook,
}