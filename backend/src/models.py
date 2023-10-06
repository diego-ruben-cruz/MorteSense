class User:
    def __init__(self, id, email, password, name, username, phone_number, roles="2001"):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.username = username
        self.phone_number = phone_number
        self.roles = roles

class Device:
    def __init__(self, id, name, user_id, message):
        self.id = id
        self.name = name
        self.user_id = user_id
        self.message = message

class MotionDetections:
    def __init__(self, id, timestamp, device_id, message):
        self.id = id
        self.timestamp = timestamp
        self.device_id = device_id
        self.message = message