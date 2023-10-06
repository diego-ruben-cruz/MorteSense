from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.app import app
from src.database import mysql_connection
from src.models import User
from flask import request
from werkzeug.utils import secure_filename
import os
import time

app.config['UPLOAD_FOLDER'] = 'public/uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'svg'}


@app.route("/users", methods=["GET"])
def get_all_users():

    cursor = mysql_connection.cursor()
    query = "SELECT * FROM users"
    cursor.execute(query)
    users = cursor.fetchall()
    cursor.close()

    if not users:
        return jsonify({"error": "No users found"}), 404

    # Create a list of user dictionaries
    user_list = []
    for user in users:
        user_dict = {
            "id": user[0],
            "email": user[1],
            "password": user[2],
            "name": user[3],
            "username": user[4],
            "phone_number": user[5],
            "roles": "2001",  # You can set roles as needed
        }
        user_list.append(user_dict)

    return jsonify(user_list), 200


@app.route("/@me", methods=["GET"])
@jwt_required()
def get_current_user():    
    user_id = get_jwt_identity()

    cursor = mysql_connection.cursor()
    query = "SELECT * FROM users WHERE id = %s"
    cursor.execute(query, (user_id,))
    result = cursor.fetchone()
    cursor.close()

    if not result:
        return jsonify({"error": "User not found"}), 404

    user = User(
        id=result[0],
        email=result[1],
        password=result[2],
        name=result[3],
        username=result[4],
        phone_number=result[5],
        roles="2001",
    )

    return jsonify({
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "phone_number": user.phone_number
    })


# For a given file, return whether it's an allowed type or not
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


@app.route('/upload_image', methods=['POST'])
@jwt_required()
def upload_image():
    # Check if a file was posted
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        # Make the filename safe, remove unsupported chars
        filename = secure_filename(file.filename)

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # Return the filename for the uploaded image
        return jsonify({'filename': filename}), 200

    return jsonify({'error': 'File type not allowed'}), 400


