import mongoose from "mongoose";
import { IUser } from "./user";

interface Like {
  userId: string
}
interface IBook extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  isbn: number;
  year: number;
  title: string;
  genre: string[];
  author: string[];
  publisher: string;
  desc: string;
  price: number;
  poster: string;
  stock: number;
  likes: Like[];
}

const BookSchema: mongoose.Schema = new mongoose.Schema<IBook>({
  isbn: {
    type: Number,
    unique: true,
  },
  year: Number,
  title: String,
  genre: [String],
  author: [String],
  publisher: String,
  desc: String,
  price: Number,
  poster: String,
  stock: Number,
  likes: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }
  ]
}, {
  versionKey: false,
  timestamps: true,
});

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export { BookModel, IBook };
