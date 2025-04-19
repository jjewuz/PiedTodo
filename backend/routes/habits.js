const express = require('express');
const router = express.Router();
const db = require('../db');

// Получить привычки
router.get('/:userId', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM habits WHERE userId = ?', [req.params.userId]);
    res.json(rows);
});

// Добавить привычку
router.post('/', async (req, res) => {
    const { name, frequency, count, userId } = req.body;
    await db.query('INSERT INTO habits (name, frequency, count, userId) VALUES (?, ?, ?, ?)', [name, frequency, count, userId]);
    res.sendStatus(201);
});

// Изменить счетчик
router.patch('/:id', async (req, res) => {
    const { count } = req.body;
    await db.query('UPDATE habits SET count = ? WHERE id = ?', [count, req.params.id]);
    res.sendStatus(200);
});

// Удалить
router.delete('/:id', async (req, res) => {
    await db.query('DELETE FROM habits WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
});

module.exports = router;
