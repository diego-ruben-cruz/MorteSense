import mysql.connector

# MySQL Configuration
mysql_host = "mds-rds.cqkrqdqrehjj.us-east-1.rds.amazonaws.com"
mysql_user = "admin"
mysql_password = "mdspr001"

try:
    mysql_connection = mysql.connector.connect(
        host=mysql_host,
        user=mysql_user,
        password=mysql_password,
        port=3306
    )
    print("Connected to the database successfully!")

    cursor = mysql_connection.cursor()

    # Check existing databases
    cursor.execute("SHOW DATABASES;")
    print(cursor.fetchall())  # This will display all databases

    # If 'mds-rds' is not in the list of databases, create it
    cursor.execute("CREATE DATABASE IF NOT EXISTS `mds-rds`;")
    cursor.execute("USE `mds-rds`;")
    cursor.execute("SHOW TABLES LIKE 'users';")
    tables = cursor.fetchall()  # This should print the name of the 'users' table if it exists

    # Create 'users' table if it does not exist
    if ('users',) not in tables:
        cursor.execute("""
        CREATE TABLE `users` (
          `id` varchar(255) NOT NULL,
          `email` varchar(255) NOT NULL,
          `password` varchar(255) NOT NULL,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """)

    cursor.close()

except mysql.connector.Error as error:
    print("Failed to connect to the database:", error)
