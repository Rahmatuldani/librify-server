import mongoose from "mongoose";
require('dotenv').config();

let url: string = '';

if (!process.env.MONGODB_URI) {
  url = 'mongodb://20.2.89.234:27017/librify';
} else {
  url = process.env.MONGODB_URI;
}

mongoose.connect(url);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
