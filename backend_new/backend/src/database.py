import mysql.connector

# MySQL Configuration
#mysql_host = "morte-sense.cqkrqdqrehjj.us-east-1.rds.amazonaws.com"
#mysql_user = "admin"
#mysql_password = "masterpass"
#mysql_port = 3306

mysql_host = "localhost"
mysql_user = "root"
mysql_password = "root"
mysql_port = 8889
mysql_connection = None

try:
    print("Trying to connect to AWS")
    mysql_connection = mysql.connector.connect(
        host=mysql_host,
        user=mysql_user,
        password=mysql_password,
        port=mysql_port,
    )
    print("Connected to the database successfully!")

    # If 'mds-rds' is not in the list of databases, create it
    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute("CREATE DATABASE IF NOT EXISTS `morte-sense`;")
    mysql_connection.commit()
    cursor.close() 

    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute("USE `morte-sense`;")
    mysql_connection.commit()
    cursor.close() 

    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS `users` (
      `id` varchar(255) NOT NULL,
      `email` varchar(255) NOT NULL,
      `password` varchar(64) NOT NULL,
      `name` varchar(255) NOT NULL,
      `username` varchar(255) NOT NULL,
      `phone_number` varchar(255) NOT NULL,
      `avatar` varchar(255),
      `roles` varchar(255) NOT NULL DEFAULT '2001',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    """)
    mysql_connection.commit()
    cursor.close() 

    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS  `devices` (
      `id` varchar(255) NOT NULL,
      `user_id` varchar(255) NOT NULL,
      `name` varchar(255) NOT NULL,
      `message` varchar(255) DEFAULT 'Detected',
      `cooldowm` TIME DEFAULT '00:05:00',
      PRIMARY KEY (`id`),
      FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    """)
    mysql_connection.commit()
    cursor.close() 

    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS  `motion-detections` ( 
      `id` varchar(255) NOT NULL,
      `device_id` varchar(255) NOT NULL,
      `detected_on` TIMESTAMP NOT NULL,
      `message` varchar(255) DEFAULT 'Detected',
      PRIMARY KEY (`id`),
      FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    """)
    mysql_connection.commit()
    cursor.close() 

    print("Database ready!")

except mysql.connector.Error as error:
    print("Failed to connect to the database:", error)


# MySQL CLI: mysql -h mds-rds.cqkrqdqrehjj.us-east-1.rds.amazonaws.com -P 3306 -u admin -p
# Enter password: motion123