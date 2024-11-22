from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/your_db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    card_number = db.Column(db.String(16), nullable=True)
    status = db.Column(db.String(20), nullable=False, default='Pending')

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "currency": self.currency,
            "payment_method": self.payment_method,
            "phone_number": self.phone_number,
            "email": self.email,
            "status": self.status
        }

# Routes
@app.route('/process_payment', methods=['POST'])
def process_payment():
    data = request.json
    payment = Payment(
        amount=data.get('amount'),
        currency=data.get('currency'),
        payment_method=data.get('payment_method'),
        phone_number=data.get('phone_number'),
        email=data.get('email'),
        card_number=data.get('card_number'),
    )
    db.session.add(payment)
    db.session.commit()

    # Mock payment processing
    if payment.payment_method == 'M-Pesa':
        response = process_mpesa_payment(payment.phone_number, payment.amount)
    else:
        response = {"status": "Success", "transaction_id": "MOCK123"}

    payment.status = response['status']
    db.session.commit()
    return jsonify(payment.to_dict()), 201

def process_mpesa_payment(phone_number, amount):
    # Mocked M-Pesa API interaction
    return {"status": "Success", "transaction_id": "MPESA123"}

if __name__ == "__main__":
    db.create_all()  # Run once to create the database tables
    app.run(debug=True)
