from flask import jsonify, request
from src.app import app
import os
from twilio.rest import Client

account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)


@app.route("/send-sms", methods=["POST"])
def send_sms():
    phone_number = request.json["phone_number"]
    message = request.json["message"]

    try:
        # Use the Twilio client to send an SMS message
        client.messages.create(
            body=message,
            from_="+18446590037",  # Replace with your Twilio phone number
            to=phone_number
        )
        return jsonify({"message": "SMS sent successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
