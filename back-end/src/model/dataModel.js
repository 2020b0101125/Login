import { User, Task } from "../config/createSchema.js";
import bcrypt from "bcrypt";

export const showUser = async (role) => {
  let resp;
  try {
    switch (role) {
      case "admin":
        resp = await User.find({ role: { $ne: "admin" } });
        break;

      case "manager":
        resp = await User.find({ role: "employee" });
        break;
      default:
        break;
    }
    return resp;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUser = async (username, email, password, role) => {
  password = await bcrypt.hash(password, 10);
  // console.log(passed);
  try {
    const user = new User({ username, email, password, role });
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

export const createTasks = async (
  title,
  description,
  dueDate,
  priority,
  assignedTo,
  assignedBy
) => {
  console.log("model: ", title, assignedTo, assignedBy);
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      assignedBy,
    });
    await task.save();
    return task;
  } catch (err) {
    console.error("error in creating task: ", err);
    res.status(500).json({ message: "server error", error: err });
  }
};

export const getTasks = async (id, role) => {
  try {
    if (role === "employee") {
      const data = await Task.find({ assignedTo: id });
      return data;
    } else if (role === "manager") {
      const data = await Task.find({ assignedBy: id });
      return data;
    } else {
      const data = await Task.find();
      return data;
    }
  } catch (err) {
    console.error("error in fetching all tasks from the datbase", err);
    throw err;
  }
};

export const tasksById = async (id, user) => {
  try {
    const data = await Task.find({ taskId: id }).populate(
      "assignedTo assignedBy",
      "username email role"
    );
    if (data.length === 0) return null;

    if (user.role === "manager" && !data[0].assignedBy._id.equals(user._id)) {
      return "manager not allowed";
    }

    return data;
  } catch (err) {
    console.error("error in getting tasks by id from database", err);
    throw err;
  }
};

export const deleteTaskById = async (id) => {
  try {
    const data = await Task.deleteOne({ taskId: id });
    return data;
  } catch (err) {
    console.error("error in deleting task by id from db: ", err);
    throw err;
  }
};
export const getMyInfos = async (_id) => {
  try {
    const data = await User.findById(_id);
    return data;
  } catch (err) {
    console.error("error in getting member profile from the db: ", err);
    throw err;
  }
};
export const deleteTasks = async () => {};
export const replaceTaskById = async (id, user, body) => {
  try {
    const task = await Task.findOne({ taskId: id });
    if (!task) return null;
    if (
      user.role === "manager" &&
      (!task.assignedBy || !task.assignedBy.equals(user._id))
    )
      return 403;
    task.title = body.title;
    task.description = body.description;
    task.status = body.status;
    task.dueDate = body.dueDate;
    task.priority = body.priority;
    task.assignedTo = body.assignedTo;
    await task.save();
    return 1;
  } catch (err) {
    console.error("error in replacing task by id from db: ", err);
    throw err;
  }
};
export const patchTaskById = async (id, user, updates) => {
  try {
    const data = await Task.findOne({ taskId: id });
    if (!data) return null;
    if (
      (user.role === "manager" && !data.assignedBy) ||
      !data.assignedBy.equals(user._id)
    ) {
      return 403;
    }
    Object.assign(data, updates);
    await data.save();
    return 200;
  } catch (err) {
    console.error("error in patching the task from db: ", err);
    throw err;
  }
};

export const savePhoto = async (photoPath, user) => {
  try {
    console.log(user);
    const addPh = await User.findByIdAndUpdate(
      user._id,
      { photo: photoPath },
      { new: true }
    );
    if (!addPh) return 404;
    return addPh;
  } catch (err) {
    console.error("error in adding photo to the db", err);
    throw err;
  }
};
