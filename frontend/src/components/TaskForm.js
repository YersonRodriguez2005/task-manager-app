import React, { useState, useEffect } from 'react';
import '../static/TaskForm.css';

const TaskForm = ({ addTask, currentTask, updateTask }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'Pendiente',
        due_date: '',
    });

    useEffect(() => {
        if (currentTask) {
            setTask(currentTask);
        } else {
            setTask({
                title: '',
                description: '',
                status: 'Pendiente',
                due_date: '',
            });
        }
    }, [currentTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTask) {
            updateTask({ ...task, id: currentTask.id });
        } else {
            addTask(task);
        }
        setTask({
            title: '',
            description: '',
            status: 'Pendiente',
            due_date: '',
        });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Título"
                required
                className="task-input"
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="task-textarea"
            ></textarea>
            <input
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                className="task-date"
            />
            <button type="submit" className="task-button">
                {currentTask ? 'Actualizar Tarea' : 'Agregar Tarea'}
            </button>
        </form>
    );
};

export default TaskForm;