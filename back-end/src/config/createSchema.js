import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const Book = mongoose.model("Book", bookSchema);
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
