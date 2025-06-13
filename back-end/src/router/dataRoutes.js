import express from "express";
import { register, login, show } from "../controller/dataController.js";
const router = express.Router();

router.get("/user", show);
router.post("/register", register);
router.post("/login", login);
export default router;
