import mongoose from "mongoose";

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
}, {
  versionKey: false,
  timestamps: true,
});

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export { BookModel, IBook };
