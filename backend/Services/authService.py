import jwt
import datetime
from app import db

def generate_token(user):
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, 'your_secret_key', algorithm='HS256')
    return token