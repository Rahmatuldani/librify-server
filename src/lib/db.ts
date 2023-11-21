import mongoose from "mongoose";
require('dotenv').config();

const url: string = `${process.env.MONGODB_URI}` || 'mongodb://20.2.89.234:27017/librify';

mongoose.connect(url);

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error")
);
database.once("open", () => console.log("✅ mongodb connected successfully"));

mongoose.Promise = Promise;
