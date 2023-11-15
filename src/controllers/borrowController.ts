import { BorrowModel } from "../models/borrow";
import response from "../utils/response";

async function getBorrow(req: any, res: any) {
    // const { id } = req.params;

    try {
        const borrow = await BorrowModel.find()
            .populate({
                path: 'user',
                select: 'name'})
            .populate('book');
        return response(res, { message: 'Get borrow success', data: borrow });
    } catch (error) {
        return response(res, { status: 500, message: `Get borrow failed ${error}` });
    }
}

async function addBorrow(req: any, res: any) {
    const { userId, bookId, quantity } = req.body;
    const today = new Date();
    today.setHours(0,0,0,0);

    try {        
        const borrow = await BorrowModel.create({
            user: userId, 
            book: bookId,
            quantity: quantity,
            date: today
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

export {
    getBorrow,
    addBorrow,
    deleteBorrow,
}