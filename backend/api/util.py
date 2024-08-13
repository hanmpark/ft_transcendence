import time
import base64
import random
import resend
import os

from plivo import RestClient

def generate_id(prefix: str) -> str:
    timestamp = str(int(time.time() * 1000))
    random_number = str(random.randint(0, 9999))
    encoded_timestamp = base64.urlsafe_b64encode((timestamp + random_number).encode()).decode().rstrip("=")
    return f"{prefix}_{encoded_timestamp}"

def send_verification_email(to: list, verification_link: str):
    resend.api_key = os.getenv("RESEND_API_KEY")

    params: resend.Emails.SendParams = {
        "from": "noreply@transcendence.evan.sh",
        "to": to,
        "subject": "pls verify ur email",
        "html": f"<strong>pls click this link</strong><br><a href='{verification_link}'>Verify here</a>",
    }

    email = resend.Emails.send(params)

def send_otp_via_sms(to: str, otp: str):
    auth_id = os.getenv("PLIVO_AUTHID")
    auth_token = os.getenv("PLIVO_AUTHTOKEN")
    client = RestClient(auth_id, auth_token)

    response = client.messages.create(
        src='+19296056286',
        dst=to,
        text=f"Your verification code is: {otp}. Please use this code to verify your account."
    )

    return response
