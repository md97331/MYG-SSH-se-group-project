from flask import Blueprint, jsonify, request
from ..db_utils import execute_query

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    """
    Add a product to the collaborative cart for a specific group.
    If the product already exists, update its quantity.
    """
    data = request.get_json()
    group_id = data.get('group_id')
    product_name = data.get('product_name')
    added_by_user = data.get('added_by_user')
    quantity = data.get('quantity', 1)

    if not group_id or not product_name or not added_by_user:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Check if the product already exists in the cart
        check_query = """
            SELECT id, quantity
            FROM collaborative_cart
            WHERE group_id = %s AND product_name = %s AND added_by_user = %s AND is_checked_out = FALSE
        """
        existing_item = execute_query(check_query, (group_id, product_name, added_by_user))

        if existing_item:
            # Update quantity if the product exists
            update_query = """
                UPDATE collaborative_cart
                SET quantity = quantity + %s
                WHERE id = %s
            """
            execute_query(update_query, (quantity, existing_item[0]['id']))
            return jsonify({"message": "Product quantity updated"}), 200
        else:
            # Insert new product if it does not exist
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
        execute_query(query, (item_id,))
        return jsonify({"message": "Item removed from cart"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500