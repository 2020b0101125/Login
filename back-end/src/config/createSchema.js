import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import { config } from "./configENV.js";

const connection = mongoose.createConnection(config.MONGODB_URI);
const autoInc = AutoIncrementFactory(connection);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
UserSchema.plugin(autoInc, {
  inc_field: "userId",
  start_seq: 1,
});
export const User = mongoose.model("member", UserSchema);

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    default: "to-do",
  },
  dueDate: Date,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member",
  },
});
taskSchema.plugin(autoInc, {
  inc_field: "taskId",
  start_seq: 1,
});
export const Task = mongoose.model("Task", taskSchema);

/*I have to work on logins ,clusters*/
