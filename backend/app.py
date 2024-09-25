from flask import Flask, current_app
import pymysql
from config import Config
from flask_cors import CORS  # Importar CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitar CORS solo para solicitudes desde el frontend (http://localhost:3000)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Registrar el blueprint de tareas
    from routes.task_routes import task_bp
    app.register_blueprint(task_bp)

    return app

# Crear la conexión a la base de datos
def get_db_connection():
    connection = pymysql.connect(
        host=current_app.config['MYSQL_HOST'],
        user=current_app.config['MYSQL_USER'],
        password=current_app.config['MYSQL_PASSWORD'],
        db=current_app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
