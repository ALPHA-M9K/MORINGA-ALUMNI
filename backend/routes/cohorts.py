from flask import Blueprint, request, jsonify
from services.cohorts_services import CohortService
from ..model import User
from ..model import Cohort
from datetime import datetime

cohorts_routes = Blueprint('cohorts_routes', __name__)

# Create a new cohort (public or private)
@cohorts_routes.route('/create', methods=['POST'])
def create_cohort():
    data = request.get_json()
    
    # Validate input data
    if not data.get('name') or not data.get('admin_id') or not data.get('start_date'):
        return jsonify({"error": "Name, admin ID, and start date are required"}), 400

    # Ensure start_date is in proper format
    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return jsonify({"error": "Invalid date format for start_date. Use YYYY-MM-DD HH:MM:SS"}), 400
    
    cohort_data = {
        'name': data['name'],
        'description': data.get('description', ''),
        'start_date': start_date,
        'end_date': data.get('end_date', None),
        'is_active': data.get('is_active', True),
        'admin_id': data['admin_id']
    }

    # Create cohort using the service
    cohort_id = CohortService.create_cohort(cohort_data)
    return jsonify({"message": "Cohort created successfully", "cohort_id": cohort_id}), 201

# List all cohorts
@cohorts_routes.route('/', methods=['GET'])
def list_cohorts():
    cohorts = CohortService.get_all_cohorts()
    return jsonify(cohorts), 200

# Update a cohort (e.g., change its name or description)
@cohorts_routes.route('/<cohort_id>', methods=['PUT'])
def update_cohort(cohort_id):
    data = request.get_json()

    # Validate input data
    if not data:
        return jsonify({"error": "No data provided for update"}), 400

    # Update the cohort using the service
    updated_cohort = CohortService.update_cohort(cohort_id, data)
    if not updated_cohort:
        return jsonify({"error": "Cohort not found"}), 404
    
    return jsonify({"message": "Cohort updated successfully"}), 200

# Add a user to a cohort
@cohorts_routes.route('/<cohort_id>/join', methods=['POST'])
def join_cohort(cohort_id):
    data = request.get_json()
    
    if 'user_id' not in data:
        return jsonify({"error": "User ID is required"}), 400

    user_id = data['user_id']
    
    # Join cohort using the service
    success = CohortService.add_user_to_cohort(cohort_id, user_id)
    if not success:
        return jsonify({"error": "Unable to join cohort"}), 400

    return jsonify({"message": "User successfully added to cohort"}), 200
