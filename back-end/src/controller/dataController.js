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
  deleteTasks,
  updateTaskById,
} from "../model/dataModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/configENV.js";

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
    throw err;
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
      return res.status(401).json({ error: "invalid username or password" });
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
      return res.status(200).json({ message: "enter valid id" });
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
export const updateTask = async () => {};
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
