import { BookModel, IBook } from "../models/book"
import response from "../utils/response";
import path from 'path';
import fs from 'fs';

async function getBooks(req: any, res:any) {
    try {
        const books: IBook[] = await BookModel.find();
        return response(res, { message: 'Get books success', data: {books} })

    } catch (error) {
        return response(res, { status: 500, message: `Get books failed ${error}` })
    }
}

async function createBook(req: any, res: any) {
    const {
        isbn, year, title, genre, author, publisher, desc, price,
    } = req.body;

    if (!req.file || req.file.fieldname !== 'poster') {
        return response(res, { status: 400, message: 'Poster is required' })
    }

    try {
        const book = await BookModel.create({
            isbn, year, title, genre, author, publisher, desc, price, poster: req.file.filename
        })

        return response(res, { message: 'Create book success', data: {book} })
    } catch (error) {
        return response(res, { status: 500, message: `Create book failed ${error}` })
    }
}

async function deleteBook(req: any, res: any) {
    const { id } = req.params;
    try {
        const book = await BookModel.findById(id);

        if (!book) {
            return response(res, { status: 404, message: 'Book not found' })
        }

        const ktpPath = path.join(__dirname, '../uploads/poster', book.poster);

        if (fs.existsSync(ktpPath)) {
            fs.unlink(ktpPath, (err) => {
                if (err) {
                    return response(res, { status: 500, message: `${err}`});
                }
            });
        }

        await BookModel.findByIdAndDelete(id);

        return response(res, { message: 'Delete book success' })
    } catch (error) {
        return response(res, { status: 500, message: `Delete book failed ${error}` })
    }
}

async function getPoster(req: any, res: any) {
    const { id } = req.params;
    try {
        const file = path.join(__dirname, '../uploads/poster/', id)
        if (!file) {
            return response(res, { status: 404, message: 'File not found' })
        }
        return res.sendFile(file)
    } catch (error) {
        return response(res, { status: 500, message: `Get book poster failed ${error}` })
    }
}

export {
    getBooks,
    createBook,
    deleteBook,
    getPoster
}