from flask import jsonify, request
from src.app import app
import os
from twilio.rest import Client
from src.database import mysql_connection

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

@app.route("/test", methods=["GET"])
def test():
    return "200"


@app.route("/send-sms/<device_id>", methods=["GET"])
def send_sms(device_id):
    
    #Get phone number
    cursor = mysql_connection.cursor(dictionary=True)
    query = "SELECT user_id, message FROM devices WHERE id = %s"
    cursor.execute(query, (device_id,))
    result = cursor.fetchone()
    cursor.close()

    if(result is None):
        return jsonify({"error": str("Device doesn't exist")}), 500
    
    message = result["message"]

    query = "SELECT phone_number FROM users WHERE id = %s"
    cursor = mysql_connection.cursor(dictionary=True)
    cursor.execute(query, (result['user_id'],))
    result = cursor.fetchone()
    cursor.close()

    phone_number = result['phone_number']

    #CHECK IF COOLDOWN DONE
    #ADD NOTIFICATION

    try:
        # Use the Twilio client to send an SMS message
        client.messages.create(
            body=message,
            from_="+18444901403",  # Replace with your Twilio phone number
            to=phone_number
        )
        return jsonify({"message": str(message), "phone_number": str(phone_number)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
