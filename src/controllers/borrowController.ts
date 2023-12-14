import { BookModel } from "../models/book";
import { BorrowModel } from "../models/borrow";
import response from "../utils/response";

async function getAllBorrow(req: any, res: any) {
    try {
        const borrow = await BorrowModel.find()
            .populate({
                path: 'user',
                select: 'name'})
            .populate('books.book');
        return response(res, { message: 'Get borrow success', data: borrow });
    } catch (error) {
        return response(res, { status: 500, message: `Get borrow failed ${error}` });
    }
}

async function getBorrow(req: any, res: any) {
    const { id } = req.params;

    if (!id) {
        return response(res, { status: 400, message: 'ID is required' })
    }

    try {
        const borrow = await BorrowModel.find({ user: id })
            .populate('books.book');
        return response(res, { message: 'Get borrow success', data: borrow });
    } catch (error) {
        return response(res, { status: 500, message: `Get borrow failed ${error}` });
    }
}

async function addBorrow(req: any, res: any) {
    const { userId, books } = req.body;
    const today = new Date();

    try {        
        const endDay = new Date();
        const borrow = await BorrowModel.create({
            user: userId, 
            books: books,
            startDate: today,
            endDate: endDay.setDate(today.getDate() + 7),
            status: 'dibuat'
        })

        await books.map(async (item: any) => {
            const book = await BookModel.findOne({ _id: item.book });
            if (book) {
                book.stock = book.stock - item.quantity;
                await book.save();
            }
        })
        return response(res, { message: `Add borrow success`, data: borrow })
    } catch (error) {
        return response(res, { status: 500, message: `Add borrow failed ${error}` });
    }
}

async function deleteBorrow(req: any, res: any) {
    try {
        await BorrowModel.deleteMany();
        return response(res, { message: 'Delete borrow success' })
    } catch (error) {
        return response(res, { status: 500, message: `Delete borrow failed ${error}` })
    }
}

async function changeStatus(req: any, res: any) {
    const { id } = req.params;
    const { status, denda } = req.body;

    if (!status) {
        return response(res, { status: 400, message: 'Status is required' })
    }

    try {
        const borrow = await BorrowModel.findOne({ _id: id});
        if (!borrow) {
            return response(res, { status: 404, message: 'Borrow not found' })
        }

        if (status === 'dikembalikan' || status === 'batal') {
            borrow.books.map(async (item: any) => {
                const book = await BookModel.findOne({ _id: item.book });
                if (book) {
                    book.stock = book.stock + item.quantity;
                    await book.save();
                }
            })
        }

        if (status === 'denda') {
            borrow.denda = denda || 0
        }

        borrow.status = status;
        await borrow.save();
        return response(res, { message: 'Change status borrow success' })

    } catch (error) {
        return response(res, { status: 500, message: `Change status borrow failed ${error}` })
    }
}

export {
    getAllBorrow,
    getBorrow,
    addBorrow,
    deleteBorrow,
    changeStatus,
}