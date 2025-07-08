import jwt from "jsonwebtoken";
import { config } from "../config/configENV.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied not provided token" });
  }
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.error("token verification failed", token);
    return res.status(403).json({ error: "invalid or expiry token" });
  }
};
