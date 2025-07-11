import jwt from "jsonwebtoken";
import { config } from "../config/configENV.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    console.error("token verification failed", token);
    return res.status(401).json({ error: "invalid or expiry token" });
  }
};
