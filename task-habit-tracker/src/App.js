import React, { useState, useEffect } from 'react';

const getToday = () => new Date().toISOString().slice(0, 10);

const App = () => {
    // ---------- ЗАДАЧИ ----------
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDate, setTaskDate] = useState(getToday());

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!taskTitle.trim()) return;
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            date: taskDate,
            done: false
        };
        setTasks([...tasks, newTask]);
        setTaskTitle('');
        setTaskDate(getToday());
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // ---------- ПРИВЫЧКИ ----------
    const [habits, setHabits] = useState([]);
    const [habitName, setHabitName] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('habits')) || [];
        setHabits(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = () => {
        if (!habitName.trim()) return;
        const newHabit = {
            id: Date.now(),
            name: habitName,
            frequency: 'daily',
            history: []
        };
        setHabits([...habits, newHabit]);
        setHabitName('');
    };

    const toggleHabit = (id) => {
        const today = getToday();
        setHabits(habits.map(habit => {
            if (habit.id !== id) return habit;
            const alreadyDone = habit.history.includes(today);
            const newHistory = alreadyDone
                ? habit.history.filter(date => date !== today)
                : [...habit.history, today];
            return { ...habit, history: newHistory };
        }));
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const getStreak = (history) => {
        const today = new Date();
        let streak = 0;
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            if (history.includes(dateStr)) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Управление задачами и привычками</h1>

            {/* === ЗАДАЧИ === */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Задачи</h2>
                <div className="flex mb-4 gap-2">
                    <input
                        type="text"
                        placeholder="Название задачи"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        type="date"
                        value={taskDate}
                        onChange={(e) => setTaskDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Добавить
                    </button>
                </div>

                <ul>
                    {tasks.map(task => (
                        <li key={task.id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => toggleTask(task.id)}
                                    className="mr-2"
                                />
                                <span className={task.done ? 'line-through text-gray-500' : ''}>
                                    {task.title} ({task.date})
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500"
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* === ПРИВЫЧКИ === */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Привычки</h2>
                <div className="flex mb-4 gap-2">
                    <input
                        type="text"
                        placeholder="Новая привычка"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <button
                        onClick={addHabit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Добавить
                    </button>
                </div>

                <ul>
                    {habits.map(habit => {
                        const doneToday = habit.history.includes(getToday());
                        const streak = getStreak(habit.history);
                        return (
                            <li key={habit.id} className="flex justify-between items-center border-b py-2">
                                <div>
                                    <span
                                        className={`cursor-pointer ${doneToday ? 'text-green-600 font-bold' : ''}`}
                                        onClick={() => toggleHabit(habit.id)}
                                    >
                                        {habit.name}
                                    </span>
                                    <div className="text-sm text-gray-500">Стрик: {streak} дней</div>
                                </div>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    className="text-red-500"
                                >
                                    Удалить
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
};

export default App;
