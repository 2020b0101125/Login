import User from "../config/createSchema.js";
import { createUser, chkLogin, showUser } from "../model/dataModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/configENV.js";

export const show = async (req, res) => {
  try {
    const resp = await showUser();
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const ans = await createUser(username, password);
    console.log(ans);
    res.status(201).json({ message: "registration successful" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send("username and password are required");
  }

  try {
    const ans = await chkLogin(username, password);
    if (!ans) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const result = bcrypt.compare(password, ans.password);
    if (!result) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const token = jwt.sign({ user: ans.username }, config.SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ token, message: "login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed", message: err.message });
  }
};
