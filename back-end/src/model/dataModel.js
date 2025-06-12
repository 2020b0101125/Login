import User from "../config/createSchema.js";
export const createUser = async (username, password) => {
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
