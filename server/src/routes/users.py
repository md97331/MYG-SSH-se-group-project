from flask import Blueprint, jsonify, request
from ..db_utils import execute_query

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/users/register', methods=['POST'])
def register_user():
    """
    Register a new user and assign them to a group.
    """
    data = request.get_json()
    username = data.get('username')
    password_hash = data.get('password_hash')
    group_id = data.get('group_id', None)

    try:
        query = """
            INSERT INTO users_table (username, password_hash, group_id)
            VALUES (%s, %s, %s)
        """
        execute_query(query, (username, password_hash, group_id))
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/api/users/login', methods=['POST'])
def login_user():
    """
    Authenticate a user with their username and password.
    """
    data = request.get_json()
    username = data.get('username')
    password_hash = data.get('password_hash')

    try:
        query = """
            SELECT id, username, group_id
            FROM users_table
            WHERE username = %s AND password_hash = %s
        """
        user = execute_query(query, (username, password_hash), fetchone=True)
        if user:
            return jsonify({"user": user}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_details(user_id):
    """
    Get details of a specific user.
    """
    try:
        query = """
            SELECT id, username, group_id
            FROM users_table
            WHERE id = %s
        """
        user = execute_query(query, (user_id,), fetchone=True)
        if user:
            return jsonify({"user": user}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/api/users', methods=['GET'])
def get_all_users():
    """
    Get a list of all users.
    """
    try:
        query = "SELECT id, username, group_id FROM users_table"
        users = execute_query(query)
        return jsonify({"users": users}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@users_bp.route('/api/users/<int:user_id>/group', methods=['GET'])
def get_user_group(user_id):
    """
    Get the group details of a specific user.
    """
    try:
        query = """
            SELECT g.id, g.group_code
            FROM users_table u
            JOIN groups_table g ON u.group_id = g.id
            WHERE u.id = %s
        """
        group = execute_query(query, (user_id,), fetchone=True)
        if group:
            return jsonify({"group": group}), 200
        else:
            return jsonify({"error": "Group not found for this user"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500