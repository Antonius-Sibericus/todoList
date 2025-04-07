import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", AuthController.signup);                  // Регистрация
router.post("/login", AuthController.login);                    // Авторизация
router.post("/verify", authMiddleware, AuthController.verify);  // Удостоверение

export default router;