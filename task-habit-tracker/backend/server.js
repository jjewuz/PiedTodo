require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Подключение к MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Или другой пользователь MySQL
    password: "", // Укажи пароль, если есть
    database: "task_tracker",
});

db.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к MySQL:", err);
    } else {
        console.log("✅ Подключено к MySQL");
    }
});

// Получение всех задач
app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Добавление задачи
app.post("/tasks", (req, res) => {
    const { title, description, date } = req.body;
    db.query("INSERT INTO tasks (title, description, date, done) VALUES (?, ?, ?, ?)",
        [title, description, date, false],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, title, description, date, done: false });
        }
    );
});

// Обновление статуса задачи
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    db.query("UPDATE tasks SET done = ? WHERE id = ?", [done, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Задача обновлена" });
    });
});

// Удаление задачи
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Задача удалена" });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
