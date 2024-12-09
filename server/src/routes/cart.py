from flask import Blueprint, jsonify, request
from ..db_utils import execute_query

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    """
    Add a product to the collaborative cart for a specific group.
    """
    data = request.get_json()
    group_id = data.get('group_id')
    product_name = data.get('product_name')
    added_by_user = data.get('added_by_user')
    quantity = data.get('quantity', 1)

    # Validate input
    if not all([group_id, product_name, added_by_user]):
        return jsonify({"error": "Missing required fields"}), 500

    try:
        # Check if the user exists
        user_query = "SELECT id FROM users_table WHERE id = %s"
        user_result = execute_query(user_query, (added_by_user,), fetchone=True)
        if not user_result:
            return jsonify({"error": "User does not exist"}), 500

        # Check if the group exists
        group_query = "SELECT id FROM groups_table WHERE id = %s"
        group_result = execute_query(group_query, (group_id,), fetchone=True)
        if not group_result:
            return jsonify({"error": "Group ID is not valid"}), 500

        # Insert product into the collaborative cart
        insert_query = """
            INSERT INTO collaborative_cart (group_id, product_name, added_by_user, quantity)
            VALUES (%s, %s, %s, %s)
        """
        execute_query(insert_query, (group_id, product_name, added_by_user, quantity))
        return jsonify({"message": "Product added to cart"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@cart_bp.route('/api/cart/<int:group_id>', methods=['GET'])
def get_cart_by_group(group_id):
    """
    Get all products in the collaborative cart for a specific group.
    """
    try:
        # Validate if the group exists
        group_query = "SELECT id FROM groups_table WHERE id = %s"
        group_result = execute_query(group_query, (group_id,), fetchone=True)
        if not group_result:
            return jsonify({"error": "Group ID is not valid"}), 404

        # Query the cart if the group exists
        query = """
            SELECT id, product_name, added_by_user, quantity, is_checked_out
            FROM collaborative_cart
            WHERE group_id = %s AND is_checked_out = FALSE
        """
        cart_items = execute_query(query, (group_id,))
        return jsonify({"cart": cart_items}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/api/cart/checkout', methods=['POST'])
def checkout_cart():
    """
    Mark all items in the collaborative cart for a specific group as checked out.
    """
    data = request.get_json()
    group_id = data.get('group_id')

    try:
        query = """
            UPDATE collaborative_cart
            SET is_checked_out = TRUE
            WHERE group_id = %s AND is_checked_out = FALSE
        """
        execute_query(query, (group_id,))
        return jsonify({"message": "Cart checked out successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/api/cart/remove', methods=['POST'])
def remove_item_from_cart():
    """
    Remove a specific product from the collaborative cart.
    """
    data = request.get_json()
    item_id = data.get('item_id')

    try:
        query = "DELETE FROM collaborative_cart WHERE id = %s"
        result = execute_query(query, (item_id,))

        # Check if the item was deleted
        if not result:
            return jsonify({"error": "Failed to remove item from cart"}), 500

        return jsonify({"message": "Item removed from cart"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500