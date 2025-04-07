import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authMiddleware(req, res, next) {
    const token = req.header("jwt_token");

    if (!token) {
        return res.status(403).json({ message: "Авторизационный токен не найден" });
    };

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Авторизационный токен не действителен" });
    };
};