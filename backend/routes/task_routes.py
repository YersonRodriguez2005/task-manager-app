from flask import Blueprint, jsonify, request
from app import get_db_connection

task_bp = Blueprint('task_bp', __name__)

# Obtener todas las tareas
@task_bp.route('/tasks', methods=['GET'])
def get_tasks():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM tasks"
            cursor.execute(sql)
            tasks = cursor.fetchall()
        return jsonify(tasks)
    finally:
        connection.close()

# Crear una nueva tarea
@task_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO tasks (title, description, due_date)
                VALUES (%s, %s, %s)
            """
            cursor.execute(sql, (data['title'], data['description'], data['due_date']))
            connection.commit()
        return jsonify({'message': 'Task created successfully'}), 201
    finally:
        connection.close()

# Actualizar una tarea existente
@task_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                UPDATE tasks
                SET title = %s, description = %s, due_date = %s
                WHERE id = %s
            """
            cursor.execute(sql, (data['title'], data['description'], data['due_date'], task_id))
            connection.commit()
        return jsonify({'message': 'Task updated successfully'})
    finally:
        connection.close()

# Eliminar una tarea
@task_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = "DELETE FROM tasks WHERE id = %s"
            cursor.execute(sql, (task_id,))
            connection.commit()
        return jsonify({'message': 'Task deleted successfully'})
    finally:
        connection.close()
