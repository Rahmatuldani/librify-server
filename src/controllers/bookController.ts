import { BookModel, IBook } from "../models/book"
import response from "../utils/response";
import path from 'path';
import fs from 'fs';

const pageSize = 5;

async function getBooks(req: any, res:any) {
    const { page } = req.query || 1;

    try {
        const books: IBook[] = await BookModel.find().skip((page - 1) * pageSize).limit(pageSize);

        return response(res, { message: 'Get books success', data: {books} })
    } catch (error) {
        return response(res, { status: 500, message: `Get books failed ${error}` })
    }
}

async function getPages(req: any, res: any) {
    try {
        const books = await BookModel.countDocuments();
        const pages = Math.ceil(books / pageSize)
    
        return response(res, { message: 'Get pages success', data: {pages} })
    } catch (error) {
        return response(res, { status: 500, message: `Get pages failed ${error}` })
    }
}

async function searchBooks(req: any, res: any) {
    const { search } = req.params;

    try {
        const books = await BookModel.find({
            $or: [
                { title: search },
                { author: search }
            ]
        })

        if (!books) {
            return response(res, { status: 404, message: 'Book not found' })
        }
    
        return response(res, { message: 'Get book success', data: {books} })
    } catch (error) {
        return response(res, { status: 500, message: `Get pages failed ${error}` })
    }
}

async function createBook(req: any, res: any) {
    const {
        isbn, year, title, genre, author, publisher, desc, price, stock
    } = req.body;

    if (!req.file || req.file.fieldname !== 'poster') {
        return response(res, { status: 400, message: 'Poster is required' })
    }

    try {
        const book = await BookModel.create({
            isbn, year, title, genre, author, publisher, desc, price, poster: req.file.filename, stock
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

async function updateBook(req: any, res: any) {
    const { id } = req.params;

    try {
        const book = await BookModel.findOne({ _id: id })

        if (!book) {
            return response(res, { status: 404, message: 'Book not found' });
        }

        await BookModel.findByIdAndUpdate({ _id: id }, req.body);

        return response(res, { message: 'Update book success' })
    } catch (error) {
        return response(res, { status: 500, message: `Update book failed ${error}` });
    }
}

async function changePoster(req: any, res: any) {
    const { id } = req.params;

    try {
        const book = await BookModel.findOne({ _id: id });

        if(!book) {
            return response(res, { status: 404, message: 'Book not found' });
        }

        const file = path.join(__dirname, '../uploads/poster/', book.poster)
        if (fs.existsSync(file)) {
            fs.unlink(file, (err) => {
                if (err) {
                    return response(res, { status: 500, message: `${err}`});
                }
            });
        }

        book.poster = req.file.filename;
        await book.save();

        return response(res, { message: 'Change poster success' })
    } catch (error) {
        return response(res, { status: 500, message: `Change poster failed ${error}` });
    }
}

async function updateStock(req: any, res: any) {
    const { id } = req.params;
    const { stock } = req.body;
    try {
        const book = await BookModel.findOne({ _id: id })
        if (!book) {
            return response(res, { status: 404, message: 'Book not found' })
        }
        book.stock = stock;
        book.save();
        return response(res, { message: 'Update book stock success' })
    } catch (error) {
        return response(res, { status: 500, message: `Error update book stock ${error}` })
    }
}

export {
    getBooks,
    getPages,
    searchBooks,
    createBook,
    deleteBook,
    getPoster,
    updateBook,
    changePoster,
    updateStock
}