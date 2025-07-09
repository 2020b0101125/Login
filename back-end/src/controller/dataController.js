// import User from "../config/createSchema.js";
import {
  createUser,
  chkLogin,
  showUser,
  createTasks,
  getTasks,
  tasksById,
  deleteTaskById,
  getMyInfos,
  savePhoto,
  replaceTaskById,
  patchTaskById,
} from "../model/dataModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/configENV.js";
import cloudinary from "../config/cloudinary.js";
export const show = async (req, res) => {
  const { id, username, role } = req.user;
  let data;
  try {
    if (role === "employee") {
      res.json({ message: `welcome ${role} ${username}`, tasks: "tasks" });
    }
    const resp = await showUser(role);
    res.json({ message: `welcome ${role} ${username}`, resp, tasks: "tasks" });
    console.log("resp");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in creating tasks" });
  }
};

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);
  try {
    const ans = await createUser(username, email, password, role);
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
      return res.status(404).json({ error: "invalid username or password" });
    }
    const result = await bcrypt.compare(password, ans.password);
    if (!result) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    console.log("ans: ", ans._id);
    const token = jwt.sign(
      { _id: ans._id, id: ans.userId, username: ans.username, role: ans.role },
      config.SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("token: ", token);
    res.status(200).json({ token, message: "login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed", message: err.message });
  }
};

export const createTask = async (req, res) => {
  console.log("controller: ", req.user);
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;
    const newTask = await createTasks(
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      req.user._id
    );
    res.status(201).json({ message: "task created successfully", newTask });
  } catch (err) {
    console.error("error creating task: ", err);
    res.status(500).json({ error: "server error" });
  }
};
export const getTask = async (req, res) => {
  try {
    const { _id, id, username, role } = req.user;
    const tasks = await getTasks(_id, role);
    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: `there are no task under ${role} ${username}` });
    }
    return res.status(200).json({
      message: `we have shared the tasks under ${role} ${username}`,
      tasks,
    });
  } catch (err) {
    console.error("error in getting task: ", err);
    res.status(500).json({ error: "Server error", err });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await tasksById(req.params.id, req.user);
    if (task === null) {
      return res.status(400).json({ message: "enter valid id" });
    }
    if (task === "manager not allowed") {
      return res
        .status(200)
        .json({ message: "managers can access only there own created tasks" });
    }

    return res.status(200).json({
      message: "the task  of specified id is successfully shared",
      task,
    });
  } catch (err) {
    console.error("error in getting task by id: ", err);
    res
      .status(500)
      .json({ message: "error in getting the task by id", error: err });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const data = await deleteTaskById(req.params.id);
    if (data.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "task not found or already deleted" });
    }
    return res.status(200).json({ message: "task deleted successfully" });
  } catch (err) {
    console.error("error in deleting task by id: ", err);
    res.status(500).json({ message: "error in deleting task by id", err });
  }
};
export const replaceTask = async (req, res) => {
  const taskId = req.params.id;
  const user = req.user;
  const body = req.body;
  try {
    const data = await replaceTaskById(taskId, user, body);
    if (data === null) {
      return res.status(404).json({ message: "task not found" });
    }
    if (data === 403) {
      return res
        .status(403)
        .json({ message: "managers can only replace their own tasks" });
    }
    return res
      .status(200)
      .json({ message: "task has been replaced successfully" });
  } catch (err) {
    console.error("error in replacing task: ", err);
    res.status(500).json({ message: "error in replacing task", err });
  }
};
export const patchTask = async (req, res) => {
  const body = req.body;
  const taskId = req.params.id;
  const user = req.user;
  const allowedFields = [
    "title",
    "description",
    "status",
    "dueDate",
    "priority",
    "assignedTo",
  ];
  const updates = {};
  for (let key of allowedFields) {
    if (req.body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  try {
    const data = await patchTaskById(taskId, user, updates);
    if (data === null) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (data === 403) {
      return res
        .status(403)
        .json({ message: "Managers can patch only their own tasks" });
    }
    return res.status(200).json({ message: "Task has been patched" });
  } catch (err) {
    console.error("error in patching the task: ", err);
    res.status(500).json({ message: "error in patchg task", err });
  }
};
export const getMyInfo = async (req, res) => {
  try {
    const data = await getMyInfos(req.user._id);
    console.log(data);
    res.status(200).json({ message: "data found", data });
  } catch (err) {
    console.error("error in fetching member profile data: ", err);
    res.status(500).json({ message: "error in fetching profile data", err });
  }
};

export const addPhoto = async (req, res) => {
  try {
    const photo = req.file ? req.file.filename : null;
    if (!photo)
      return res
        .status(401)
        .json({ message: "Bad request ,please provide a file" });
    const data = await savePhoto(photo, req.user);
    if (data === 404)
      return res.status(404).json({ message: "member not found" });
    return res
      .status(201)
      .json({ message: "Member added successfully", member: data });
  } catch (err) {
    console.error("error in adding photo to the server: ", err);
    res.status(500).json({ message: "erro adding photo to the server", err });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "members" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    console.log(req.user);
    const data = await savePhoto(result.secure_url, req.user);
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      data,
    });
  } catch (err) {
    console.error("error in uploading image from controller: ", err);
    res.status(500).json({ message: err.message });
  }
};
