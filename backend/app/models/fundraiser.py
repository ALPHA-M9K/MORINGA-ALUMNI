from app import db

class Fundraiser(db.Model):
    __tablename__ = 'fundraisers'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    target_amount = db.Column(db.Float, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)
