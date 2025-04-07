import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js";
import jwtGenerator from "../services-utilities/jwtGenerator.js";
import authMiddleware from "../middleware/authMiddleware.js";

class AuthController {
    async signup(req, res) {
        const { surname, name, paternal, email, password, isChief } = req.body;

        try {
            const user = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );

            if (user.rows.length > 0) {
                res.status(401).json("Такой пользователь уже существует");
            };

            if (!surname || !name || !paternal || !email || !password || !isChief) {
                res.status(501).json("Введены не все данные");
            };

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await pool.query(
                "INSERT INTO users (surname, name, paternal, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [surname, name, paternal, email, password]
            );

            const jwtToken = jwtGenerator(newUser.rows[0].user_id);

            return res.json({ jwtToken });
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Ошибка на сервере");
        };
    };

    async login(req, res) {
        //
    };

    async verify(req, res) {
        //
    };
};

export default new AuthController();