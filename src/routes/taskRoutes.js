import express from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

// Cập nhật trạng thái
router.patch("/:id/status", updateStatus);

export default router;