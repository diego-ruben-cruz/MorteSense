from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src.app import app
from src.database import mysql_connection
from src.models import User
from uuid import uuid4
import time


def get_uuid():
    return str(uuid4())


@app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]
    phone_number = request.json["phone_number"]

    # Check if user already exists
    cursor = mysql_connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        return jsonify({"error": "User already exists"}), 409

    # Insert new user into MySQL
    query = "INSERT INTO users (id, name, username, email, password, phone_number) VALUES (%s, %s, %s, %s, %s, %s)"
    user_id = get_uuid()
    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute(query, (user_id, name, username, email, password, phone_number))
    mysql_connection.commit()
    cursor.close()

    # Create a new token with the user id embedded in it
    access_token = create_access_token(identity=user_id)

    response = make_response(
        jsonify({"id": user_id, "name": name, "username": username, "email": email, "token": access_token})
    )
    return response


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    # Fetch user from MySQL
    cursor = mysql_connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    cursor.close()
    
    if not result:
        return jsonify({"error": "Unauthorized"}), 401

    user = User(id=result['id'], email=result['email'], password=result['password'], name=result['name'],
                username=result['username'], phone_number=result['phone_number'], roles="2001")

    if user.password != password:
        return jsonify({"error": "Unauthorized"}), 401

    # Create a new token with the user id embedded in it
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "roles": user.roles,
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


@app.route("/delete_account", methods=["DELETE"])
@jwt_required()
def delete_account():
    user_id = get_jwt_identity()

    cursor = mysql_connection.cursor()  # Corrected here
    query = "DELETE FROM users WHERE id = %s"
    cursor.execute(query, (user_id,))
    result = cursor.rowcount
    mysql_connection.commit()
    cursor.close()

    if result == 0:
        return jsonify({"error": "No account found to delete"}), 404
    else:
        return jsonify({"message": "Account deleted successfully"}), 200


@app.route("/change_password", methods=["POST"])
@jwt_required()
def change_password():
    try:
        user_id = get_jwt_identity()
        current_password = request.json["current_password"]
        new_password = request.json["new_password"]
        confirm_password = request.json["confirm_password"]

        # Fetch user from MySQL
        cursor = mysql_connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE id = %s"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()
        cursor.close()

        if not result:
            return jsonify({"error": "Unauthorized"}), 401

        user = User(
            id=result['id'],
            email=result['email'],
            password=result['password'],
            name=result['name'],
            username=result['username'],
            roles="2001"
        )

        if not (user.password, current_password):
            return jsonify({"error": "Current password is incorrect"}), 401

        if new_password != confirm_password:
            return jsonify({"error": "New passwords do not match"}), 400

        # Hash new password

        # Update password in MySQL
        query = "UPDATE users SET password = %s WHERE id = %s"
        cursor.execute(query, (new_password, user_id))
        mysql_connection.commit()
        cursor.close()

        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route("/edit_user", methods=["POST"])
@jwt_required()
def edit_user():
    user_id = get_jwt_identity()

    if not user_id:
        print("No user_id retrieved from JWT")
        return jsonify({"error": "No user_id in JWT"}), 400

    new_email = request.json.get("new_email")
    new_phone_number = request.json.get("new_phone_number")
    new_name = request.json.get("new_name")
    new_username = request.json.get("new_username")

    print(f"User ID: {user_id}, New Email: {new_email}, New Phone: {new_phone_number}, New Name: {new_name}, New Username: {new_username}")

    # Fetch user from MySQL
    cursor = mysql_connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE id = %s"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()

    if not result:
        print(f"No user found with id: {user_id}")
        return jsonify({"error": "Unauthorized"}), 401

    print(f"Found user: {result}")

    # Ensure new_email, new_name, and new_username are not None before proceeding to update
    if new_email is None or new_phone_number is None or new_name is None or new_username is None:
        print(
            f"One or more fields to update are None. new_email: {new_email}, new_phone_number: {new_phone_number}, new_name: {new_name}, new_username: {new_username}")
        return jsonify({"error": "One or more fields to update are None"}), 400

    # Update user details in MySQL
    query = "UPDATE users SET email = %s, phone_number = %s, name = %s, username = %s WHERE id = %s"
    cursor.execute(query, (new_email, new_phone_number, new_name, new_username, user_id))
    mysql_connection.commit()
    cursor.close()

    print(f"Rows updated: {cursor.rowcount}")

    if cursor.rowcount == 0:
        return jsonify({"error": "No rows updated"}), 500

    return jsonify({"message": "User details updated successfully"}), 200
