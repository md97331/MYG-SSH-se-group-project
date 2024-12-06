from flask import Blueprint, jsonify, request
from ..db_utils import execute_query
import random
import string

groups_bp = Blueprint('groups', __name__)

def generate_group_code():
    """
    Generate a random alphanumeric code for group identification.
    """
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

@groups_bp.route('/api/groups/create', methods=['POST'])
def create_group():
    """
    Create a new group and assign a unique group code.
    """
    data = request.get_json()
    created_by_user = data.get('created_by_user')

    try:
        group_code = generate_group_code()
        query = """
            INSERT INTO groups_table (group_code, created_by_user)
            VALUES (%s, %s)
        """
        execute_query(query, (group_code, created_by_user))
        return jsonify({"message": "Group created successfully", "group_code": group_code}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@groups_bp.route('/api/groups/join', methods=['POST'])
def join_group():
    """
    Join an existing group using a group code.
    """
    data = request.get_json()
    user_id = data.get('user_id')
    group_code = data.get('group_code')

    try:
        query = "SELECT id FROM groups_table WHERE group_code = %s"
        group = execute_query(query, (group_code,), fetchone=True)
        if not group:
            return jsonify({"error": "Group not found"}), 404

        query = "UPDATE users_table SET group_id = %s WHERE id = %s"
        execute_query(query, (group['id'], user_id))
        return jsonify({"message": "Joined group successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@groups_bp.route('/api/groups/<int:group_id>/users', methods=['GET'])
def get_group_users(group_id):
    """
    Get all users in a specific group.
    """
    try:
        query = """
            SELECT id, username
            FROM users_table
            WHERE group_id = %s
        """
        users = execute_query(query, (group_id,))
        return jsonify({"users": users}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@groups_bp.route('/api/groups/<int:group_id>', methods=['GET'])
def get_group_details(group_id):
    """
    Get details of a specific group, including its group code and creator.
    """
    try:
        query = """
            SELECT group_code, created_by_user
            FROM groups_table
            WHERE id = %s
        """
        group = execute_query(query, (group_id,), fetchone=True)
        if group:
            return jsonify({"group": group}), 200
        else:
            return jsonify({"error": "Group not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500