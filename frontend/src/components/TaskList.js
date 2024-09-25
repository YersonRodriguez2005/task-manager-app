import React from 'react';

const TaskList = ({ tasks, deleteTask, setCurrentTask }) => {
    return (
        <div>
            <h2>Lista de Tareas</h2>
            {tasks.map((task) => (
                <div key={task.id} className="task-item">
                    <div>
                        <strong>{task.title}</strong> - {task.description}
                    </div>
                    <div>
                        <button onClick={() => setCurrentTask(task)}>Editar</button>
                        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
