import mongoose from "mongoose";
require('dotenv').config();

let url: string = 'mongodb://20.2.89.234:27017/librify';

if (process.env.MONGODB_URI) {
  url = `${process.env.MONGODB_URI}`;
}

mongoose.connect(url);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
