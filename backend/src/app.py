from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_session import Session
import redis
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = 'mdspr'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_REDIS'] = redis.from_url("redis://127.0.0.1:6379")
app.config['SESSION_PERMANENT'] = False
app.config["JWT_SECRET_KEY"] = "mdspr"
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# CORS configuration
CORS(app, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE"])
server_session = Session(app)

from src.routes import auth, user, device, alerts, twilio