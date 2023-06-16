from flask import Flask, request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import os
import redis
import mysql.connector
from uuid import uuid4
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from twilio.rest import Client

load_dotenv()

app = Flask(__name__)
app.secret_key = 'mdspr'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")
app.config['SESSION_PERMANENT'] = False
app.config["JWT_SECRET_KEY"] = "mdspr"
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)
jwt = JWTManager(app)
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


@app.route("/send-sms", methods=["POST"])
def send_sms():
    phone_number = request.json["phone_number"]
    message = request.json["message"]

    try:
        # Use the Twilio client to send an SMS message
        client.messages.create(
            body=message,
            from_="+18446590037",  # Replace with your Twilio phone number
            to=phone_number
        )
        return jsonify({"message": "SMS sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
