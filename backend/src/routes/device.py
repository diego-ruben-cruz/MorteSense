from uuid import uuid4
from src.models import Device
from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.app import app
from src.database import mysql_connection


def get_uuid():
    return str(uuid4())[:8]


@app.route("/devices", methods=["GET"])
@jwt_required()
def get_all_devices():
    user_id = get_jwt_identity()  # Get the user ID of the authenticated user

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    with mysql_connection.cursor(dictionary=True) as cursor:
        query = "SELECT * FROM devices WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        devices = cursor.fetchall()

    if not devices:
        return jsonify({"error": "No devices found"}), 404
    return jsonify(devices), 200


@app.route("/create_device", methods=["POST"])
@jwt_required()
def create_device():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    if 'name' not in request.json:
        return jsonify({"error": "Missing 'name' field in request body"}), 400

    name = request.json["name"]
    message = request.json["message"]

    try:
        device_id = get_uuid()
        query = "INSERT INTO devices (id, name, message, user_id) VALUES (%s, %s, %s, %s)"  # Include user_id in the query
        cursor = mysql_connection.cursor()
        cursor.execute(query, (device_id, name, message, user_id))
        mysql_connection.commit()

        device = Device(
            id=device_id,
            name=name,
            message=message,
            user_id=user_id
        )

        response = make_response(
            jsonify({
                "id": device.id,
                "name": device.name,
                "message": message
            })
        )
        return response, 201
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route("/device/<device_id>", methods=["GET"])
@jwt_required()
def get_device(device_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # Fetch the device from the devices table
    with mysql_connection.cursor(dictionary=True) as cursor:
        query = "SELECT * FROM devices WHERE id = %s"
        cursor.execute(query, (device_id,))
        device = cursor.fetchone()

    if not device:
        return jsonify({"error": "Device not found"}), 404

    return jsonify(device), 200


@app.route("/update_device/<device_id>", methods=["PUT"])
@jwt_required()
def update_device(device_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    with mysql_connection.cursor() as cursor:
        query = "UPDATE devices SET name = %s, message = %s WHERE id = %s"
        cursor.execute(query, (data["name"], data["message"], device_id))
        mysql_connection.commit()

    return jsonify({"message": "Device updated successfully"}), 200


@app.route("/delete_device/<device_id>", methods=["DELETE"])
@jwt_required()
def delete_device(device_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    with mysql_connection.cursor() as cursor:
        query = "DELETE FROM devices WHERE id = %s"
        cursor.execute(query, (device_id,))
        mysql_connection.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Device not found"}), 404

    return jsonify({"message": "Device deleted successfully"}), 200
