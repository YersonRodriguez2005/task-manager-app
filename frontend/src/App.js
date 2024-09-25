import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const apiBaseUrl = 'http://localhost:5000';

    // Cargar tareas desde el backend
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks`);
            if (!response.ok) throw new Error('Error al obtener las tareas');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Error al agregar la tarea');
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateTask = async (task) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('Error al actualizar la tarea');
            fetchTasks();
            setCurrentTask(null);  // Resetear la tarea actual después de la actualización
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar la tarea');
            fetchTasks();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="app-container">
            <h1>To-Do App</h1>
            <TaskForm addTask={addTask} currentTask={currentTask} updateTask={updateTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} setCurrentTask={setCurrentTask} />
        </div>
    );
};

export default App;
