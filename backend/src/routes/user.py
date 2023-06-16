from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.app import app
from src.database import mysql_connection
from src.models import User


@app.route("/@me", methods=["GET"])
@jwt_required()  # This ensures the endpoint is protected with JWT
def get_current_user():
    # get_jwt_identity() function retrieves the identity of the current token
    user_id = get_jwt_identity()

    # Fetch user from MySQL
    cursor = mysql_connection.cursor()
    query = "SELECT * FROM users WHERE id = %s"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()

    if not result:
        return jsonify({"error": "User not found"}), 404

    uuid = User(result[0], result[1], result[2])

    return jsonify({
        "id": uuid.id,
        "email": uuid.email
    })
