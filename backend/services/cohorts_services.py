from model import Cohort
from model import User
from model import CohortMembership

class CohortService:

    @staticmethod
    def create_cohort(cohort_data):
        # Create the cohort in the database using the Cohort model
        cohort = Cohort(
            name=cohort_data['name'],
            description=cohort_data.get('description', ''),
            start_date=cohort_data['start_date'],
            end_date=cohort_data.get('end_date', None),
            is_active=cohort_data.get('is_active', True),
            admin_id=cohort_data['admin_id']
        )
        db.session.add(cohort)  # Add the cohort to the session
        db.session.commit()  # Commit the transaction to the database
        return cohort.id  # Return the ID of the newly created cohort

    @staticmethod
    def get_all_cohorts():
        # Retrieve all cohorts from the database
        cohorts = Cohort.query.all()  # Get all cohorts from the Cohort model
        return [cohort.to_dict() for cohort in cohorts]  # Convert to list of dicts for easy API response

    @staticmethod
    def update_cohort(cohort_id, data):
        # Fetch the cohort by ID
        cohort = Cohort.query.get(cohort_id)
        if not cohort:
            return None  # Cohort not found

        # Update the cohort fields if present in the data
        if 'name' in data:
            cohort.name = data['name']
        if 'description' in data:
            cohort.description = data['description']
        if 'end_date' in data:
            cohort.end_date = data['end_date']
        if 'is_active' in data:
            cohort.is_active = data['is_active']
        
        db.session.commit()  # Save the updated cohort back to the database
        return cohort

    @staticmethod
    def add_user_to_cohort(cohort_id, user_id):
        # Fetch the cohort by ID
        cohort = Cohort.query.get(cohort_id)
        if not cohort:
            return False  # Cohort not found

        # Fetch the user by ID
        user = User.query.get(user_id)
        if not user:
            return False  # User not found

        # Check if the user is already a member of the cohort
        if CohortMembership.query.filter_by(cohort_id=cohort_id, user_id=user_id).first():
            return False  # User is already a member
        
        # Add the user to the cohort membership
        membership = CohortMembership(cohort_id=cohort_id, user_id=user_id)
        db.session.add(membership)
        db.session.commit()  # Commit the changes to the database
        return True
