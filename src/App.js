import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    });

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [habitName, setHabitName] = useState('');
    const [habitFrequency, setHabitFrequency] = useState('ежедневно');

    // Сохранение
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addTask = () => {
        if (taskTitle.trim() === '' || taskDate.trim() === '') return;
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            date: taskDate,
            done: false,
        };
        setTasks([...tasks, newTask]);
        setTaskTitle('');
        setTaskDate('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const toggleTaskDone = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addHabit = () => {
        if (habitName.trim() === '') return;
        const newHabit = {
            id: Date.now(),
            name: habitName,
            frequency: habitFrequency,
            count: 0, // новый счётчик
        };
        setHabits([...habits, newHabit]);
        setHabitName('');
        setHabitFrequency('ежедневно');
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const changeHabitCount = (id, delta) => {
        setHabits(habits.map(h =>
            h.id === id
                ? { ...h, count: Math.max(0, h.count + delta) }
                : h
        ));
    };


    return (
        <div className="container">
            <h1>PiedTracker ALPHA</h1>
            <div className="background"></div>

            <div className="card-item">

                <div className="form-container">
                    <h2>Мои задачи</h2>
                    <div className="form">
                        <input
                            type="text"
                            placeholder="Название задачи"
                            value={taskTitle}
                            className="input-field full-width"
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <div className="date-button-container">
                            <input
                                type="date"
                                value={taskDate}
                                className="input-field"
                                onChange={(e) => setTaskDate(e.target.value)}
                            />
                            <button onClick={addTask} className="custom-button">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-list">
                    {tasks.map(task => (
                        <div key={task.id} className="card">
                            <div>
                                <p className={`title ${task.done ? 'done' : ''}`}>{task.title}</p>
                                <p className="date">{task.date}</p>
                            </div>
                            <div className="card-actions">
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTaskDone(task.id)}
                                />
                                <button onClick={() => deleteTask(task.id)}>✕</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-item">
                <div className="form-container">
                    <h2>Мои привычки</h2>
                    <div className="form">
                        <input
                            type="text"
                            placeholder="Название привычки"
                            value={habitName}
                            class="input-field"
                            onChange={(e) => setHabitName(e.target.value)}
                        />
                        <div className="date-button-container">
                            <select
                                value={habitFrequency}
                                className="custom-select"
                                onChange={(e) => setHabitFrequency(e.target.value)}
                            >
                                <option value="ежедневно">Ежедневно</option>
                                <option value="еженедельно">Еженедельно</option>

                            </select>
                            <button onClick={addHabit} className="custom-button">Добавить</button>
                        </div>
                    </div>
                </div>

                <div className="card-list">
                    {habits.map(habit => (
                        <div key={habit.id} className="card">
                            <div>
                                <p className="title">{habit.name}</p>
                                <p className="date">Частота: {habit.frequency}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => changeHabitCount(habit.id, -1)}>-</button>
                                <span>{habit.count}</span>
                                <button onClick={() => changeHabitCount(habit.id, 1)}>+</button>
                                <button onClick={() => deleteHabit(habit.id)}>✕</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default App;
