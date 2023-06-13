from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import re
from flask_cors import CORS, cross_origin
import bcrypt
import jwt

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = 'mdspr'

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = 8889
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'user-system'

mysql = MySQL(app)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        if 'email' in data and 'password' in data:
            email = data['email']
            password = data['password']
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM user WHERE email = %s', (email,))
            user = cursor.fetchone()
            if user and bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
                # Use a library like PyJWT to create a JWT
                token = jwt.encode({'userid': user[0]}, app.secret_key)
                return jsonify({'message': 'Logged in successfully!', 'token': token})
            else:
                return jsonify({'message': 'Please enter correct email / password!'}), 400
        except Exception as e:
            print(f"Error occurred: {e}")
            return jsonify({'message': 'Internal server error!'}), 500


@app.route('/logout', methods=['GET'])
def logout():
    session.clear()  # Clear the session data
    return jsonify({'message': 'Logged out successfully!'})


@app.route('/registration', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')  # please make sure the field names match those in your frontend form
        password = data.get('password')

        try:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM user WHERE email = %s', (email,))
            account = cursor.fetchone()
            if account:
                return jsonify({'message': 'Account already exists!'}), 400
            else:
                if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                    return jsonify({'message': 'Invalid email address!'}), 400
                elif not username or not password or not email:
                    return jsonify({'message': 'Please fill out the form!'}), 400
                else:
                    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                    cursor.execute('INSERT INTO user (name, email, password) VALUES (%s, %s, %s)',
                                   (username, email, hashed_password))
                    mysql.connection.commit()
                    return jsonify({'message': 'You have successfully registered!'})
        except Exception as e:
            print(f"Error occurred: {e}")
            return jsonify({'message': 'Internal server error!'}), 500


@app.route('/user', methods=['GET'])
def get_user():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in!'}), 401

    user_id = session['user_id']  # Retrieve the user ID from the session

    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT email FROM user WHERE id = %s', (user_id,))
        user = cursor.fetchone()

        if user:
            email = user[0]  # Retrieve the email from the database
            return jsonify({'email': email})
        else:
            return jsonify({'message': 'User not found!'}), 404

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'message': 'Internal server error!'}), 500


if __name__ == "__main__":
    app.run(debug=True)
