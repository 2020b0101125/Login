import User from "../config/createSchema.js";
import bcrypt from "bcrypt";

export const showUser = async () => {
  try {
    const resp = await User.find();
    return resp;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUser = async (username, password) => {
  password = await bcrypt.hash(password, 10);
  // console.log(passed);
  try {
    const user = new User({ username, password });
    await user.save();
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const chkLogin = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
