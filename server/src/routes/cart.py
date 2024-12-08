from flask import Blueprint, jsonify, request
from ..db_utils import execute_query

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/api/cart/update', methods=['POST'])
def update_cart_quantity():
    """
    Update the quantity of a product in the collaborative cart for a specific group.
    Supports adding or subtracting quantity.
    """
    data = request.get_json()
    group_id = data.get('group_id')
    product_name = data.get('product_name')
    added_by_user = data.get('added_by_user')
    action = data.get('action')  # "add" or "subtract"
    quantity = data.get('quantity', 1)

    if not group_id or not product_name or not added_by_user or action not in ['add', 'subtract']:
        return jsonify({"error": "Missing required fields or invalid action"}), 400

    try:
        # Check if the product already exists in the cart
        check_query = """
            SELECT id, quantity
            FROM collaborative_cart
            WHERE group_id = %s AND product_name = %s AND added_by_user = %s AND is_checked_out = FALSE
        """
        existing_item = execute_query(check_query, (group_id, product_name, added_by_user))

        if existing_item:
            current_quantity = existing_item[0]['quantity']
            new_quantity = current_quantity + quantity if action == 'add' else current_quantity - quantity

            if new_quantity <= 0:
                # Remove the product if the new quantity is 0 or less
                delete_query = """
                    DELETE FROM collaborative_cart
                    WHERE id = %s
                """
                execute_query(delete_query, (existing_item[0]['id'],))
                return jsonify({"message": "Product removed from cart"}), 200
            else:
                # Update the product quantity
                update_query = """
                    UPDATE collaborative_cart
                    SET quantity = %s
                    WHERE id = %s
                """
                execute_query(update_query, (new_quantity, existing_item[0]['id']))
                return jsonify({"message": "Product quantity updated"}), 200
        else:
            if action == 'add':
                # Insert new product if it does not exist and action is "add"
                insert_query = """
                    INSERT INTO collaborative_cart (group_id, product_name, added_by_user, quantity)
                    VALUES (%s, %s, %s, %s)
                """
                execute_query(insert_query, (group_id, product_name, added_by_user, quantity))
                return jsonify({"message": "Product added to cart"}), 201
            else:
                # Cannot subtract from a non-existing product
                return jsonify({"error": "Product not found in cart"}), 404
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