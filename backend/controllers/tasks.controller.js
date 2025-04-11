import pool from "../db.js";

class TasksController {
    async getAllTasks(req, res) {
        try {
            const allTasks = await pool.query(
                "SELECT * FROM tasks WHERE task_creator = $1 OR task_responsible = $1",
                [req.user.id]
            );

            if (!allTasks) {
                return res.status(500).json({ error: true, message: "Невозможно получить задачи" });
            };

            return res.status(200).json({ error: false, allTasks: allTasks.rows });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async getOneTask(req, res) {
        const taskId = req.params.id;

        try {
            const oneTask = await pool.query(
                "SELECT * FROM tasks WHERE task_id = $1",
                [taskId]
            );

            if (oneTask.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось найти задачу" });
            };

            return res.status(200).json({ error: false, oneTask: oneTask.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async createTask(req, res) {
        const { title, desc, priority, status, created, updated, deadline, responsible } = req.body;

        if (!title || !desc || !priority || !status || !created || !updated || !deadline || !responsible) {
            return res.status(500).json({ error: true, message: "Введены не все данные" });
        };

        try {
            const createdTask = await pool.query(
                "INSERT INTO tasks (task_title, task_desc, task_priority, task_status, task_created, task_updated, task_finished, task_creator, task_responsible) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
                [title, desc, priority, status, created, updated, deadline, req.user.id, responsible]
            );

            if (createdTask.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось создать задачу" });
            };

            return res.status(201).json({ error: false, newTask: createdTask.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async updateTask(req, res) {
        const taskId = req.params.id;

        const { title, desc, priority, status, updated, deadline, responsible } = req.body;

        try {
            const updatedTask = await pool.query(
                "UPDATE tasks SET task_title = $1, task_desc = $2, task_priority = $3, task_status = $4, task_updated = $5, task_finished = $6, task_responsible = $7 WHERE task_id = $8 RETURNING *",
                [title, desc, priority, status, updated, deadline, responsible, taskId]
            );

            if (updatedTask.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось обновить задачу" });
            };

            return res.status(200).json({ error: false, updatedTask: updatedTask.rows[0] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };

    async deleteTask(req, res) {
        const taskId = req.params.id;

        try {
            const deletedTask = await pool.query(
                "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
                [taskId]
            );

            return res.status(200).json({ error: false, message: "Задача удалена" });
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: true, message: "Ошибка на сервере" });
        };
    };
};

export default new TasksController();