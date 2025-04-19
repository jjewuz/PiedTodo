import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/api"; // Замени на домен на хостинге при деплое
const userId = "user-1234"; // Уникальный ID (можно взять из авторизации, если есть)

function App() {
    const [tasks, setTasks] = useState([]);
    const [habits, setHabits] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newHabit, setNewHabit] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/tasks/${userId}`).then(res => res.json()).then(setTasks);
        fetch(`${API_URL}/habits/${userId}`).then(res => res.json()).then(setHabits);
    }, []);

    const addTask = async () => {
        if (!newTask.trim()) return;
        const res = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, title: newTask, date: new Date(), done: false })
        });
        const data = await res.json();
        setTasks([...tasks, { id: data.id, title: newTask, date: new Date(), done: false }]);
        setNewTask("");
    };

    const toggleTask = async (id, done) => {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: !done })
        });
        setTasks(tasks.map(task => task.id === id ? { ...task, done: !done } : task));
    };

    const deleteTask = async (id) => {
        await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addHabit = async () => {
        if (!newHabit.trim()) return;
        const res = await fetch(`${API_URL}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, name: newHabit, frequency: "daily", count: 0 })
        });
        const data = await res.json();
        setHabits([...habits, { id: data.id, name: newHabit, frequency: "daily", count: 0 }]);
        setNewHabit("");
    };

    const updateHabit = async (id, count) => {
        await fetch(`${API_URL}/habits/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ count: count + 1 })
        });
        setHabits(habits.map(habit => habit.id === id ? { ...habit, count: count + 1 } : habit));
    };

    const deleteHabit = async (id) => {
        await fetch(`${API_URL}/habits/${id}`, { method: "DELETE" });
        setHabits(habits.filter(habit => habit.id !== id));
    };

    return (
        <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
            <h1>PiedTodo</h1>

            <h2>Задачи</h2>
            <input
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Новая задача"
            />
            <button onClick={addTask}>Добавить</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id, task.done)}
                        />
                        {task.title}
                        <button onClick={() => deleteTask(task.id)}>🗑</button>
                    </li>
                ))}
            </ul>

            <h2>Привычки</h2>
            <input
                value={newHabit}
                onChange={e => setNewHabit(e.target.value)}
                placeholder="Новая привычка"
            />
            <button onClick={addHabit}>Добавить</button>

            <ul>
                {habits.map(habit => (
                    <li key={habit.id}>
                        {habit.name} — {habit.count}
                        <button onClick={() => updateHabit(habit.id, habit.count)}>+1</button>
                        <button onClick={() => deleteHabit(habit.id)}>🗑</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
