import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", authMiddleware, UsersController.getAllUsers);
router.get("/:id", authMiddleware, UsersController.getOneUser);
router.put("/", authMiddleware, UsersController.updateUser);
router.put("/chief", authMiddleware, UsersController.setChief);
router.delete("/", authMiddleware, UsersController.deleteUser);

export default router;