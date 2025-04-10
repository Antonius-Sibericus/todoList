import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import TasksController from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/", authMiddleware, TasksController.getAllTasks);
router.get("/:id", authMiddleware, TasksController.getOneTask);
router.post("/", authMiddleware, TasksController.createTask);
router.put("/:id", authMiddleware, TasksController.updateTask);
router.delete("/:id", authMiddleware, TasksController.deleteTask);

export default router;