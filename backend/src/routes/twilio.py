from flask import jsonify, request
from src.app import app
import os
from twilio.rest import Client
from src.database import mysql_connection

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)


@app.route("/send-sms", methods=["POST"])
def send_sms():
    device_id = request.json["device_id"]

    #Get phone number
    cursor = mysql_connection.cursor(dictionary=True)
    query = "SELECT user_id, message FROM devices WHERE id = %s"
    cursor.execute(query, (device_id,))
    result = cursor.fetchone()

    if(result is None):
        return jsonify({"error": str("Device doesn't exist")}), 500
    
    message = result["message"]

    query = "SELECT phone_number FROM users WHERE id = %s"
    cursor.execute(query, (result['user_id'],))
    result = cursor.fetchone()

    phone_number = result['phone_number']

    try:
        # Use the Twilio client to send an SMS message
        '''
        client.messages.create(
            body=message,
            from_="+18446590037",  # Replace with your Twilio phone number
            to=phone_number
        )
        '''
        return jsonify({"message": str(message), "phone_number": str(phone_number)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
