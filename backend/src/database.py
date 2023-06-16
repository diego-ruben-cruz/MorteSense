import mysql.connector

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
