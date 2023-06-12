from flask import Flask, render_template, request, session, redirect, url_for
from flask_mysqldb import MySQL
import re

# Initialize the Flask app
app = Flask(__name__)
app.secret_key = 'mdspr'

# Configure MySQL
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = 8889
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'user-system'

mysql = MySQL(app)


# Login route for handling login functionality
@app.route('/')
@app.route('/login', methods=['GET', 'POST'])
def login():
    message = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        try:
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM user WHERE email = %s AND password = %s', (email, password,))
            user = cursor.fetchone()
        except Exception as e:
            print(f"Error occurred: {e}")
            message = "Internal server error!"
            return render_template('login.html', message=message)

        if user:
            session['loggedin'] = True
            session['userid'] = user[0]
            session['name'] = user[1]
            session['email'] = user[2]
            message = 'Logged in successfully!'
            return render_template('admin.html', message=message, session=session)
        else:
            message = 'Please enter correct email / password!'
    return render_template('login.html', message=message)


# Logout route for handling logout functionality
@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('userid', None)
    session.pop('email', None)
    return redirect(url_for('login'))


# Register route for handling user registration
@app.route('/register', methods=['GET', 'POST'])
def register():
    message = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form:
        userName = request.form['name']
        password = request.form['password']
        email = request.form['email']
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * FROM user WHERE email = %s', (email,))
        account = cursor.fetchone()
        if account:
            message = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            message = 'Invalid email address!'
        elif not userName or not password or not email:
            message = 'Please fill out the form!'
        else:
            cursor.execute('INSERT INTO user (name, email, password) VALUES (%s, %s, %s)', (userName, email, password))
            mysql.connection.commit()
            message = 'You have successfully registered!'
    elif request.method == 'POST':
        message = 'Please fill out the form!'
    return render_template('register.html', message=message)


# Run the app in debug mode
if __name__ == "__main__":
    app.run(debug=True)
