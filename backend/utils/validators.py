def validate_cohort_creation(data):
    """
    Validate cohort creation data
    
    Args:
        data (dict): Cohort creation data
    
    Returns:
        str or None: Error message if validation fails, None otherwise
    """
    # Check if name is provided
    if not data or 'name' not in data:
        return "Cohort name is required"
    
    # Check name length
    name = data['name'].strip()
    if not name:
        return "Cohort name cannot be empty"
    
    if len(name) < 3:
        return "Cohort name must be at least 3 characters long"
    
    if len(name) > 50:
        return "Cohort name cannot exceed 50 characters"
    
    # Validate privacy flag
    if 'isPrivate' in data and not isinstance(data['isPrivate'], bool):
        return "Invalid privacy setting"
    
    # Additional optional validations can be added here
    return None

def validate_member_addition(cohort, member):
    """
    Validate adding a member to a cohort
    
    Args:
        cohort (Cohort): Cohort object
        member (User): User to be added
    
    Returns:
        str or None: Error message if validation fails, None otherwise
    """
    # Check if cohort is private and has an admin
    if cohort.is_private and not cohort.admin_id:
        return "Private cohort requires an admin"
    
    # Check if member is already in the cohort
    if member in cohort.members:
        return "User is already a member of this cohort"
    
    return None

def validate_cohort_join(cohort, user):
    """
    Validate joining a cohort
    
    Args:
        cohort (Cohort): Cohort object
        user (User): User trying to join
    
    Returns:
        str or None: Error message if validation fails, None otherwise
    """
    # Check if cohort exists
    if not cohort:
        return "Cohort not found"
    
    # Check if cohort is private
    if cohort.is_private:
        # For private cohorts, check if admin is assigned
        if not cohort.admin_id:
            return "Private cohort requires an admin"
    
    # Check if user is already a member
    if user in cohort.members:
        return "You are already a member of this cohort"
    
    return None