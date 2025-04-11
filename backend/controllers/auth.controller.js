import bcrypt from "bcrypt";
import pool from "../db.js";
import jwtGenerator from "../services-utilities/jwtGenerator.js";

class AuthController {
    async signup(req, res) {
        const { surname, name, paternal, email, password } = req.body;

        try {
            const user = await pool.query(
                "SELECT * FROM users WHERE user_email = $1",
                [email]
            );

            if (user.rows.length > 0) {
                return res.status(401).json({ error: true, message: "Такой пользователь уже существует" });
            };

            if (!surname || !name || !paternal || !email || !password) {
                return res.status(501).json({ error: true, message: "Введены не все данные" });
            };

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await pool.query(
                "INSERT INTO users (user_surname, user_name, user_paternal, user_email, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [surname, name, paternal, email, hashedPassword]
            );

            const jwtToken = jwtGenerator(newUser.rows[0].user_id);

            return res.status(201).json({ error: false, jwtToken });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await pool.query(
                "SELECT * FROM users WHERE user_email = $1",
                [email]
            );

            if (user.rows.length === 0) {
                return res.status(401).json({ error: true, message: "Неправильный логин" });
            };

            const isValid = await bcrypt.compare(
                password,
                user.rows[0].user_password
            );

            if (!isValid) {
                return res.status(401).json({ error: true, message: "Неправильный пароль" });
            };

            const jwtToken = jwtGenerator(user.rows[0].user_id);

            return res.status(201).json({ error: false, jwtToken });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async verify(req, res) {
        try {
            res.json(true);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };
};

export default new AuthController();