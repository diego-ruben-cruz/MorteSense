from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src.app import app, bcrypt
from src.database import mysql_connection
from src.models import User
from uuid import uuid4


def get_uuid():
    return str(uuid4())


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

    # Create a new token with the user id embedded in it
    access_token = create_access_token(identity=user_id)

    response = make_response(
        jsonify({"id": user_id, "email": email, "token": access_token})
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

    # Create a new token with the user id embedded in it
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "id": user.id,
        "email": user.email,
        "token": access_token
    }), 200


@app.route("/logout", methods=["POST"])
@jwt_required()  # JWT is required for logout
def logout_user():
    # In a stateless JWT setup, logout is usually handled client-side by removing the JWT from storage
    # Optionally, you can add the token to a "blacklist" here, but it's more complex and often unnecessary
    # This function doesn't do anything in the current setup
    return jsonify({"message": "Logout successful"}), 200