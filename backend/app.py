from flask import Flask, request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import os
import redis
import mysql.connector
from uuid import uuid4

load_dotenv()

app = Flask(__name__)
app.secret_key = 'mdspr'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")
app.config['SESSION_PERMANENT'] = False
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)

# MySQL Configuration
mysql_host = "127.0.0.1"
mysql_user = "root"
mysql_password = "root"
mysql_database = "user-system"

mysql_connection = mysql.connector.connect(
    host=mysql_host,
    user=mysql_user,
    password=mysql_password,
    database=mysql_database,
    port=8889
)


class User:
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password


def get_uuid():
    return str(uuid4())


@app.route("/@me", methods=["GET"])
def get_current_user():
    if request.method == "GET":
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        # Fetch user from MySQL
        cursor = mysql_connection.cursor()
        query = "SELECT * FROM users WHERE id = %s"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()

        if not result:
            return jsonify({"error": "User not found"}), 404

        user = User(result[0], result[1], result[2])

        return jsonify({
            "id": user.id,
            "email": user.email
        })


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    # Check if user already exists
    cursor = mysql_connection.cursor()
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if result:
        return jsonify({"error": "User already exists"}), 409

    # Hash password
    hashed_password = bcrypt.generate_password_hash(password)

    # Insert new user into MySQL
    query = "INSERT INTO users (id, email, password) VALUES (%s, %s, %s)"
    user_id = get_uuid()
    cursor.execute(query, (user_id, email, hashed_password))
    mysql_connection.commit()

    session["user_id"] = user_id

    response = make_response(
        jsonify({"id": user_id, "email": email})
    )
    return response


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    # Fetch user from MySQL
    cursor = mysql_connection.cursor()
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()

    if not result:
        return jsonify({"error": "Unauthorized"}), 401

    user = User(result[0], result[1], result[2])

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    response = make_response(
        jsonify({"id": user.id, "email": user.email})
    )
    return response


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(debug=True)
