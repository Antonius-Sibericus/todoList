import pool from "../db.js";

class UsersController {
    static async getAllUsers(req, res) {
        try {
            const allUsers = await pool.query(
                "SELECT * FROM users",
                []
            );

            if (!allUsers) {
                return res.status(500).json({ error: true, message: "Невозможно получить пользователей" });
            };

            return res.status(200).json({ error: false, usersArray: allUsers.rows });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    static async getOneUser(req, res) {
        const userId = req.params.id;

        try {
            const oneUser = await pool.query(
                "SELECT * FROM users WHERE user_id = $1",
                [userId]
            );

            if (oneUser.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось найти пользователя" });
            };

            return res.status(200).json({ error: false, userItem: oneUser.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    static async updateUser(req, res) {
        const { surname, name, paternal, email } = req.body;

        try {
            const updatedUser = await pool.query(
                "UPDATE users SET surname = $1, name = $2, paternal = $3, email = $4 WHERE user_id = $5 RETURNING *",
                [surname, name, paternal, email, req.user.id]
            );

            if (updatedUser.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Невозможно обновить задачу" });
            };

            return res.status(200).json({ error: false, updatedUser: updatedUser.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    static async setChief(req, res) {
        const { chiefId } = req.body;

        try {
            const chiefedUser = await pool.query(
                "UPDATE users SET user_chief = $1 WHERE user_id = $2 RETURNING *",
                [chiefId, req.user.id]
            );

            if (chiefedUser.rows.length === 0) {
                return res.status(500).json({ error: true, message: "невозможно установить руководителя" });
            };

            return res.status(200).json({ error: false, chiefedUser: chiefedUser.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    static async deleteUser(req, res) {
        try {
            const deletedUser = await pool.query(
                "DELETE FROM users WHERE user_id = $1 RETURNING *",
                [req.user.id]
            );

            if (deletedUser.rows.length > 0) {
                return res.status(500).json({ error: true, message: "Невозможно удалить пользователя" });
            };

            return res.status(200).json({ error: false, message: "Пользователь удалён" });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };
};

export default new UsersController();