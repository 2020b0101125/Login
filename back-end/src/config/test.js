import mongoose from "mongoose";

const createDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/arnav");
};
export default createDB;
