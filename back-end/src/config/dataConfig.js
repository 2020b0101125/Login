import mongoose from "mongoose";
const createDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/arnav");
    console.log("connected to the database");
  } catch (err) {
    console.error("found error in connecting to db", err);
  }
};

export default createDB;

// import Book from "./createSchema.js";
// import express from "express";
// import bodyParser from "body-parser";
// import createDB from "./test.js";
// createDB();

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/", async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.post("/", (req, res) => {
//   try {
//     console.log(req.body);
//     const { title, author } = req.body;

//     const data = new Book({ title, author });

//     data.save();
//   } catch (err) {
//     console.error(err);
//   }
// });

// app.listen(3000, () => console.log("server runing"));
