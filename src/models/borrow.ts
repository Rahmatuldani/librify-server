import mongoose from "mongoose";
import { IUser } from "./user";
import { IBook } from "./book";

interface IBorrow extends mongoose.Document {
    user: IUser;
    book: IBook[];
    quantity: number;
    date: Date;
}

const borrowSchema: mongoose.Schema = new mongoose.Schema<IBorrow>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true,
    }],
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
})

const BorrowModel = mongoose.model<IBorrow>('Borrow', borrowSchema);

export { BorrowModel, IBorrow };