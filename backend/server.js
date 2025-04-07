import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routers/authRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use()

app.listen(PORT, () => {
    console.log("Сервер работает на порту " + PORT);
});