from flask import Blueprint, jsonify, request
from ..db_utils import execute_query

products_bp = Blueprint('products', __name__)


@products_bp.route('/api/supermarkets', methods=['GET'])
def get_supermarkets():
    try:
        query = "SELECT * FROM supermarkets"
        supermarkets = execute_query(query)
        return jsonify({"supermarkets": supermarkets}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        query = "SELECT * FROM products"
        products = execute_query(query)
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/supermarkets/<int:supermarket_id>/products', methods=['GET'])
def get_products_by_supermarket(supermarket_id):
    try:
        query = "SELECT * FROM products WHERE supermarket_id = %s"
        products = execute_query(query, (supermarket_id,))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        query = "SELECT * FROM products WHERE category LIKE %s"
        products = execute_query(query, (f"%{category}%",))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/supermarkets/<int:supermarket_id>/products/category/<string:category>', methods=['GET'])
def get_products_by_category_and_supermarket(supermarket_id, category):
    try:
        query = """
            SELECT * FROM products WHERE supermarket_id = %s AND category LIKE %s
        """
        products = execute_query(query, (supermarket_id, f"%{category}%"))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/products/search', methods=['GET'])
def search_product_by_name():
    product_name = request.args.get('name', '')
    try:
        query = "SELECT * FROM products WHERE product_name LIKE %s"
        products = execute_query(query, (f"%{product_name}%",))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/supermarkets/<int:supermarket_id>/products/stock', methods=['GET'])
def get_product_stock(supermarket_id):
    product_name = request.args.get('name', '')
    try:
        query = """
            SELECT stock FROM products WHERE supermarket_id = %s AND product_name LIKE %s
        """
        stock = execute_query(query, (supermarket_id, f"%{product_name}%"), fetchone=True)
        if stock:
            return jsonify({"stock": stock['stock']}), 200
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/api/supermarkets/<int:supermarket_id>/products/price', methods=['GET'])
def get_product_price(supermarket_id):
    product_name = request.args.get('name', '')
    try:
        query = """
            SELECT price FROM products WHERE supermarket_id = %s AND product_name LIKE %s
        """
        price = execute_query(query, (supermarket_id, f"%{product_name}%"), fetchone=True)
        if price:
            return jsonify({"price": price['price']}), 200
        else:
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500