import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routers/auth.router.js";
import usersRouter from "./routers/users.router.js";
import tasksRouter from "./routers/tasks.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
    console.log("Сервер работает на порту " + PORT);
});