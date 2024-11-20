from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import stripe  
import requests  # For M-Pesa API
import paypalrestsdk  
from backend.model import db, Fundraiser

fundraiser_bp = Blueprint('fundraiser', __name__)

class PaymentTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fundraiser_id = db.Column(db.Integer, db.ForeignKey('fundraisers.id'))
    amount = db.Column(db.Numeric(10, 2))
    payment_method = db.Column(db.String(50))
    transaction_id = db.Column(db.String(100))
    status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@fundraiser_bp.route('/donate', methods=['POST'])
def process_donation():
    try:
        data = request.json
        fundraiser_id = data.get('fundraiser_id')
        amount = data.get('amount')
        payment_method = data.get('payment_method')
        
        # Validate input
        if not fundraiser_id or not amount or not payment_method:
            return jsonify({"error": "Missing required fields"}), 400
        
        # Find the fundraiser
        fundraiser = Fundraiser.query.get(fundraiser_id)
        if not fundraiser:
            return jsonify({"error": "Fundraiser not found"}), 404
        
        # Process payment based on method
        try:
            if payment_method == 'credit_card':
                transaction = process_credit_card_payment(data, fundraiser)
            elif payment_method == 'mpesa':
                transaction = process_mpesa_payment(data, fundraiser)
            elif payment_method == 'paypal':
                transaction = process_paypal_payment(data, fundraiser)
            else:
                return jsonify({"error": "Unsupported payment method"}), 400
            
            # Update fundraiser raised amount
            fundraiser.raised_amount += amount
            
            # Save transaction
            db.session.add(transaction)
            db.session.commit()
            
            return jsonify({
                "message": "Donation successful", 
                "fundraiser": {
                    "id": fundraiser.id,
                    "title": fundraiser.title,
                    "raised_amount": float(fundraiser.raised_amount),
                    "goal_amount": float(fundraiser.goal_amount)
                }
            }), 200
        
        except Exception as payment_error:
            db.session.rollback()
            return jsonify({"error": str(payment_error)}), 400
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": "Database error"}), 500

def process_credit_card_payment(payment_data, fundraiser):
    stripe.api_key = 'your_stripe_secret_key'
    
    try:
        # Create a payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(payment_data['amount'] * 100),  # Amount in cents
            currency='usd',
            payment_method_types=['card'],
            payment_method=payment_data.get('payment_method_id')
        )
        
        # Confirm the payment
        stripe.PaymentIntent.confirm(intent.id)
        
        # Create transaction record
        transaction = PaymentTransaction(
            fundraiser_id=fundraiser.id,
            amount=payment_data['amount'],
            payment_method='credit_card',
            transaction_id=intent.id,
            status='completed'
        )
        
        return transaction
    
    except stripe.error.StripeError as e:
        raise Exception(f"Stripe payment failed: {str(e)}")

def process_mpesa_payment(payment_data, fundraiser):
    # Hypothetical M-Pesa payment processing
    try:
        # M-Pesa API call (replace with actual M-Pesa API integration)
        response = requests.post('https://mpesa-api.example.com/process', json={
            'phone_number': payment_data.get('phone_number'),
            'amount': payment_data['amount']
        })
        
        if response.status_code != 200:
            raise Exception("M-Pesa payment failed")
        
        # Create transaction record
        transaction = PaymentTransaction(
            fundraiser_id=fundraiser.id,
            amount=payment_data['amount'],
            payment_method='mpesa',
            transaction_id=response.json().get('transaction_id'),
            status='completed'
        )
        
        return transaction
    
    except Exception as e:
        raise Exception(f"M-Pesa payment failed: {str(e)}")

def process_paypal_payment(payment_data, fundraiser):
    # PayPal payment processing
    paypalrestsdk.configure({
        "mode": "sandbox",  # or "live"
        "client_id": "your_client_id",
        "client_secret": "your_client_secret"
    })
    
    try:
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "transactions": [{
                "amount": {
                    "total": str(payment_data['amount']),
                    "currency": "USD"
                }
            }],
            "redirect_urls": {
                "return_url": "http://localhost:3000/payment/success",
                "cancel_url": "http://localhost:3000/payment/cancel"
            }
        })
        
        if payment.create():
            # Create transaction record
            transaction = PaymentTransaction(
                fundraiser_id=fundraiser.id,
                amount=payment_data['amount'],
                payment_method='paypal',
                transaction_id=payment.id,
                status='pending'
            )
            
            return transaction
        else:
            raise Exception(payment.error)
    
    except Exception as e:
        raise Exception(f"PayPal payment failed: {str(e)}")