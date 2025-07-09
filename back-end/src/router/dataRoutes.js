import express from "express";
import { upload } from "../middleware/uploadPhoto.js";
import uploadImg from "../middleware/multer.js";
import {
  register,
  login,
  show,
  createTask,
  getMyInfo,
  getTask,
  getTaskById,
  replaceTask,
  patchTask,
  deleteTask,
  addPhoto,
  uploadImage,
} from "../controller/dataController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.get("/user", show);

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard/admin", verifyToken, requireRole("admin"), show);
router.get("/dashboard/manager", verifyToken, requireRole("manager"), show);
router.get("/dashboard/employee", verifyToken, requireRole("employee"), show);

router.get("/me", verifyToken, getMyInfo);

router.post(
  "/createTask",
  verifyToken,
  requireRole("manager", "admin"),
  createTask
);

router.get("/tasks", verifyToken, getTask);
router.get(
  "/tasks/:id",
  verifyToken,
  requireRole("admin", "manager"),
  getTaskById
);
router.put(
  "/task/:id",
  verifyToken,
  requireRole("admin", "manager"),
  replaceTask
);
router.patch(
  "/task/:id",
  verifyToken,
  requireRole("admin", "manager"),
  patchTask
);

router.delete("/task/:id", verifyToken, requireRole("admin"), deleteTask);

router.patch("/addPhoto", verifyToken, upload.single("photo"), addPhoto);
router.patch(
  "/uploadPhoto",
  verifyToken,
  uploadImg.single("photo"),
  uploadImage
);
export default router;
