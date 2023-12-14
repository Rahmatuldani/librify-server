import mongoose from "mongoose";
import { IUser } from "./user";
import { IBook } from "./book";

interface BooksInterface {
    book: IBook;
    quantity: number;
}

interface IBorrow extends mongoose.Document {
    user: IUser;
    books: BooksInterface[]
    startDate: Date;
    endDate: Date;
    status: string;
    denda: number;
}

const borrowSchema: mongoose.Schema = new mongoose.Schema<IBorrow>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    books: [
        {
            book: {
                type: mongoose.Types.ObjectId,
                ref: 'Book',
                required: true,
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    denda: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
})

const BorrowModel = mongoose.model<IBorrow>('Borrow', borrowSchema);

export { BorrowModel, IBorrow };