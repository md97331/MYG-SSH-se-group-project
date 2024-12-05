from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "db"), 
        port=int(os.getenv("DB_PORT", 3306)),
        user=os.getenv("DB_USER", ""),
        password=os.getenv("DB_PASSWORD", ""),
        database=os.getenv("DB_NAME", "")
    )

def execute_query(query, params=None, fetchone=False):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute(query, params)
        if fetchone:
            result = cursor.fetchone()
        else:
            result = cursor.fetchall()
        connection.commit()
        return result
    except Exception as e:
        raise Exception(f"Database error: {str(e)}")
    finally:
        cursor.close()
        connection.close()


@app.route('/api/supermarkets', methods=['GET'])
def get_supermarkets():
    try:
        query = "SELECT * FROM supermarkets"
        supermarkets = execute_query(query)
        return jsonify({"supermarkets": supermarkets}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        query = "SELECT * FROM products"
        products = execute_query(query)
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/supermarkets/<int:supermarket_id>/products', methods=['GET'])
def get_products_by_supermarket(supermarket_id):
    try:
        query = "SELECT * FROM products WHERE supermarket_id = %s"
        products = execute_query(query, (supermarket_id,))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        query = "SELECT * FROM products WHERE category LIKE %s"
        products = execute_query(query, (f"%{category}%",))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/supermarkets/<int:supermarket_id>/products/category/<string:category>', methods=['GET'])
def get_products_by_category_and_supermarket(supermarket_id, category):
    try:
        query = """
            SELECT * FROM products WHERE supermarket_id = %s AND category LIKE %s
        """
        products = execute_query(query, (supermarket_id, f"%{category}%"))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/search', methods=['GET'])
def search_product_by_name():
    product_name = request.args.get('name', '')
    try:
        query = "SELECT * FROM products WHERE product_name LIKE %s"
        products = execute_query(query, (f"%{product_name}%",))
        return jsonify({"products": products}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/supermarkets/<int:supermarket_id>/products/stock', methods=['GET'])
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

@app.route('/api/supermarkets/<int:supermarket_id>/products/price', methods=['GET'])
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
    
@app.route('/api/supermarkets_with_products', methods=['GET'])
def get_supermarkets_with_products():
    try:
        supermarkets = execute_query("SELECT * FROM supermarkets")
        for supermarket in supermarkets:
            products = execute_query("SELECT * FROM products WHERE supermarket_id = %s", (supermarket['supermarket_id'],))
            # Group products by category
            categories = {}
            for product in products:
                category = product['category']
                if category not in categories:
                    categories[category] = []
                categories[category].append(product)
            supermarket['categories'] = categories
        return jsonify({"supermarkets": supermarkets}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)