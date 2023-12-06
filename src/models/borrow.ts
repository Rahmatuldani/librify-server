import mongoose from "mongoose";
import { IUser } from "./user";
import { IBook } from "./book";

interface IBorrow extends mongoose.Document {
    user: IUser;
    books: {
        book: IBook; 
        quantity: number;
    };
    startDate: Date;
    endDate: Date;
    status: string;
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
    }
}, {
    versionKey: false,
})

const BorrowModel = mongoose.model<IBorrow>('Borrow', borrowSchema);

export { BorrowModel, IBorrow };