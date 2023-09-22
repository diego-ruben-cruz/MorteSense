class User:
    def __init__(self, id, email, password, name, username, roles="2001"):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.username = username
        self.roles = roles

class Device:
    def __init__(self, id, name, user_id):
        self.id = id
        self.name = name
        self.user_id = user_id


