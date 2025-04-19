const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить задачи по userId
router.get('/:userId', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE userId = ?', [req.params.userId]);
    res.json(rows);
});

// Добавить задачу
router.post('/', async (req, res) => {
    const { title, date, done, userId } = req.body;
    await db.query('INSERT INTO tasks (title, date, done, userId) VALUES (?, ?, ?, ?)', [title, date, done, userId]);
    res.sendStatus(201);
});

// Удалить задачу
router.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
});

// Изменить статус
router.patch('/:id', async (req, res) => {
    const { done } = req.body;
    await db.query('UPDATE tasks SET done = ? WHERE id = ?', [done, req.params.id]);
    res.sendStatus(200);
});

module.exports = router;
