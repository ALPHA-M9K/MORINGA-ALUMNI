# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from model import Cohort, User, db
# from utils.validators import validate_cohort_creation
# from middleware.auth_middleware import admin_required
# import uuid

# cohort_routes = Blueprint('cohort_routes', __name__)

# @cohort_routes.route('/create', methods=['POST'])
# @jwt_required()
# def create_cohort():
#     current_user_id = get_jwt_identity()
#     data = request.json

#     # Validate cohort creation data
#     validation_error = validate_cohort_creation(data)
#     if validation_error:
#         return jsonify({"error": validation_error}), 400

#     # Generate unique cohort ID
#     cohort_id = str(uuid.uuid4())

#     # Create new cohort
#     new_cohort = Cohort(
#         id=cohort_id,
#         name=data.get('name'),
#         is_private=data.get('isPrivate', False),
#         admin_id=current_user_id if not data.get('isPrivate') else None
#     )
    
#     try:
#         db.session.add(new_cohort)
#         db.session.commit()
        
#         return jsonify({
#             "message": "Cohort created successfully",
#             "cohort": {
#                 "id": new_cohort.id,
#                 "name": new_cohort.name,
#                 "isPrivate": new_cohort.is_private,
#                 "admin": current_user_id if not new_cohort.is_private else None
#             }
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @cohort_routes.route('/join', methods=['POST'])
# @jwt_required()
# def join_cohort():
#     current_user_id = get_jwt_identity()
#     data = request.json
#     cohort_id = data.get('cohortId')

#     # Find the cohort
#     cohort = Cohort.query.get(cohort_id)
#     if not cohort:
#         return jsonify({"error": "Cohort not found"}), 404

#     # Check if cohort is private and has an admin
#     if cohort.is_private and not cohort.admin_id:
#         return jsonify({"error": "Cohort admin not assigned"}), 403

#     # Check if user is already a member
#     user = User.query.get(current_user_id)
#     if user in cohort.members:
#         return jsonify({"error": "Already a member of this cohort"}), 400

#     try:
#         # Add user to cohort members
#         cohort.members.append(user)
#         db.session.commit()

#         return jsonify({
#             "message": "Joined cohort successfully",
#             "cohort": {
#                 "id": cohort.id,
#                 "name": cohort.name
#             }
#         }), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @cohort_routes.route('/list', methods=['GET'])
# @jwt_required()
# def list_cohorts():
#     current_user_id = get_jwt_identity()

#     # Get cohorts where user is a member or admin, or public cohorts
#     cohorts = Cohort.query.filter(
#         (Cohort.admin_id == current_user_id) | 
#         (Cohort.is_private == False) |
#         (Cohort.members.any(id=current_user_id))
#     ).all()

#     cohort_list = [{
#         "id": cohort.id,
#         "name": cohort.name,
#         "isPrivate": cohort.is_private,
#         "admin": cohort.admin_id,
#         "members": [member.username for member in cohort.members]
#     } for cohort in cohorts]

#     return jsonify(cohort_list), 200

# @cohort_routes.route('/<cohort_id>', methods=['GET'])
# @jwt_required()
# def get_cohort_details(cohort_id):
#     current_user_id = get_jwt_identity()

#     cohort = Cohort.query.get(cohort_id)
#     if not cohort:
#         return jsonify({"error": "Cohort not found"}), 404

#     # Check permissions
#     if cohort.is_private and cohort.admin_id != current_user_id:
#         user = User.query.get(current_user_id)
#         if user not in cohort.members:
#             return jsonify({"error": "Unauthorized access"}), 403

#     return jsonify({
#         "id": cohort.id,
#         "name": cohort.name,
#         "isPrivate": cohort.is_private,
#         "admin": cohort.admin_id,
#         "members": [member.username for member in cohort.members]
#     }), 200

# @cohort_routes.route('/assign-admin', methods=['POST'])
# @jwt_required()
# @admin_required
# def assign_cohort_admin():
#     data = request.json
#     cohort_id = data.get('cohortId')
#     admin_id = data.get('adminId')

#     cohort = Cohort.query.get(cohort_id)
#     if not cohort:
#         return jsonify({"error": "Cohort not found"}), 404

#     if not cohort.is_private:
#         return jsonify({"error": "Only private cohorts can have admins"}), 400

#     try:
#         cohort.admin_id = admin_id
#         db.session.commit()

#         return jsonify({
#             "message": "Admin assigned successfully",
#             "cohort": {
#                 "id": cohort.id,
#                 "name": cohort.name,
#                 "admin": cohort.admin_id
#             }
#         }), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from model import Cohort, User, db
# import uuid

# cohort_routes = Blueprint('cohort_routes', __name__)

# @cohort_routes.route('/create', methods=['POST'])
# @jwt_required()
# def create_cohort():
#     current_user_id = get_jwt_identity()
#     data = request.json

#     # Validate input
#     if not data or 'name' not in data:
#         return jsonify({"error": "Cohort name is required"}), 400

#     # Generate unique cohort ID
#     cohort_id = str(uuid.uuid4())

#     # Create new cohort
#     new_cohort = Cohort(
#         id=cohort_id,
#         name=data['name'],
#         is_private=data.get('isPrivate', False),
#         admin_id=current_user_id
#     )
    
#     try:
#         # Add current user as first member
#         user = User.query.get(current_user_id)
#         new_cohort.members.append(user)
        
#         db.session.add(new_cohort)
#         db.session.commit()
        
#         return jsonify({
#             "message": "Cohort created successfully",
#             "cohort": new_cohort.to_dict()
#         }), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @cohort_routes.route('/list', methods=['GET'])
# @jwt_required()
# def list_cohorts():
#     current_user_id = get_jwt_identity()

#     # Get cohorts where user is a member or admin
#     cohorts = Cohort.query.filter(
#         (Cohort.admin_id == current_user_id) | 
#         (Cohort.is_private == False) |
#         (Cohort.members.any(id=current_user_id))
#     ).all()

#     return jsonify([cohort.to_dict() for cohort in cohorts]), 200

# @cohort_routes.route('/join', methods=['POST'])
# @jwt_required()
# def join_cohort():
#     current_user_id = get_jwt_identity()
#     data = request.json
#     cohort_id = data.get('cohortId')

#     cohort = Cohort.query.get(cohort_id)
#     if not cohort:
#         return jsonify({"error": "Cohort not found"}), 404

#     # Check if cohort is private
#     if cohort.is_private:
#         return jsonify({"error": "Cannot join a private cohort"}), 403

#     user = User.query.get(current_user_id)
    
#     # Check if user is already a member
#     if user in cohort.members:
#         return jsonify({"error": "Already a member of this cohort"}), 400

#     try:
#         cohort.members.append(user)
#         db.session.commit()

#         return jsonify({
#             "message": "Joined cohort successfully",
#             "cohort": cohort.to_dict()
#         }), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# from flask import Blueprint, request, jsonify
# from app.models import Cohort
# from app import db

# cohort_bp = Blueprint('cohort', __name__)

# @cohort_bp.route('/create', methods=['POST'])
# def create_cohort():
#     data = request.json
#     new_cohort = Cohort(
#         name=data['name'],
#         is_private=data['isPrivate'],
#         admin=data.get('admin')  # You can set admin here if needed
#     )
    
#     db.session.add(new_cohort)
#     db.session.commit()
#     return jsonify(new_cohort.to_dict()), 201

# @cohort_bp.route('/join', methods=['POST'])
# def join_cohort():
#     data = request.json
#     cohort_id = data['cohortId']
#     cohort = Cohort.query.get_or_404(cohort_id)

#     # Check if the cohort is private
#     if cohort.is_private and cohort.admin is None:
#         return jsonify({'error': 'This cohort is private and has no admin assigned.'}), 403
    
#     # Add user to members
#     if request.user:  # Assuming you have a way to get the current user
#         cohort.members.append(request.user)
#     else:
#         return jsonify({'error': 'User  must be logged in to join a cohort.'}), 403

#     db.session.commit()
#     return jsonify({'message': 'Successfully joined cohort.'}), 200

# @cohort_bp.route('/list', methods=['GET'])
# def list_cohorts():
#     cohorts = Cohort.query.all()
#     return jsonify([cohort.to_dict() for cohort in cohorts]), 200

# @cohort_bp.route('/<int:cohort_id>', methods=['GET'])
# def get_cohort(cohort_id):
#     cohort = Cohort.query.get_or_404(cohort_id)
#     return jsonify(cohort.to_dict()), 200

# @cohort_bp.route('/<int:cohort_id>/add_member', methods=['POST'])
# def add_member(cohort_id):
#     cohort = Cohort.query.get_or_404(cohort_id)
#     data = request.json

#     if cohort.admin != request.user:  # Check if the current user is the admin
#         return jsonify({'error': 'Only the admin can add members.'}), 403

#     member_name = data.get('memberName')
#     if member_name and member_name not in cohort.members:
#         cohort.members.append(member_name)
#         db.session.commit()
#         return jsonify({'message': 'Member added successfully.'}), 200
#     return jsonify({'error': 'Invalid member name or already a member.'}), 400