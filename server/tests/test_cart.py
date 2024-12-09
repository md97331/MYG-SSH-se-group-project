import pytest
from unittest.mock import patch, MagicMock
from src.app import app

# Mock the entire database connection setup
@pytest.fixture
def mock_db_connection(mocker):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()

    # Mock successful cursor responses
    mock_conn.cursor.return_value = mock_cursor
    mock_cursor.fetchall.return_value = [
        {'id': 1, 'product_name': 'Test Product', 'added_by_user': 1, 'quantity': 2, 'is_checked_out': False}
    ]
    mock_cursor.fetchone.return_value = {'id': 1}

    # Mock context management behavior for closing
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.__exit__.return_value = False

    # Mock `get_db_connection` to return the mock connection
    mocker.patch('src.db_utils.get_db_connection', return_value=mock_conn)
    return mock_conn


# Create Flask test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


# Logging function for easier debugging
def log_response(response):
    print(f"Status Code: {response.status_code}")
    print(f"JSON Response: {response.json}")


# Test cases
def test_add_to_cart_success(mock_db_connection, client):
    response = client.post('/api/cart/add', json={
        'group_id': 1,
        'product_name': 'Test Product',
        'added_by_user': 1,
        'quantity': 2
    })
    log_response(response)
    assert response.status_code == 201
    assert response.json['message'] == "Product added to cart"


def test_add_to_cart_missing_fields(mock_db_connection, client):
    response = client.post('/api/cart/add', json={})
    log_response(response)
    assert response.status_code == 500
    assert response.json['error'] == "Missing required fields"


def test_add_to_cart_user_not_found(mock_db_connection, client):
    # Simulate user not found by returning None
    mock_db_connection.cursor.return_value.fetchone.side_effect = [None, {'id': 1}]  # User not found
    response = client.post('/api/cart/add', json={
        'group_id': 1,
        'product_name': 'Test Product',
        'added_by_user': 999,  # Non-existing user
        'quantity': 2
    })
    log_response(response)
    assert response.status_code == 500
    assert response.json['error'] == "User does not exist"


def test_get_cart_by_group_success(mock_db_connection, client):
    response = client.get('/api/cart/1')
    log_response(response)
    assert response.status_code == 200
    assert len(response.json['cart']) == 1
    assert response.json['cart'][0]['product_name'] == "Test Product"


def test_get_cart_invalid_group(mock_db_connection, client):
    # Simulate no matching group by returning None
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.get('/api/cart/999')  # Non-existent group ID
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group ID is not valid"


def test_checkout_cart_success(mock_db_connection, client):
    response = client.post('/api/cart/checkout', json={'group_id': 1})
    log_response(response)
    assert response.status_code == 200
    assert response.json['message'] == "Cart checked out successfully"


def test_remove_item_from_cart_success(mock_db_connection, client):
    response = client.post('/api/cart/remove', json={'item_id': 1})
    log_response(response)
    assert response.status_code == 200
    assert response.json['message'] == "Item removed from cart"


def test_remove_item_not_found(mock_db_connection, client):
    # Simulate a failed DELETE with rowcount = 0
    mock_db_connection.cursor.return_value.rowcount = 0
    response = client.post('/api/cart/remove', json={'item_id': 999})  # Non-existent item ID
    log_response(response)
    assert response.status_code == 500
    assert response.json['error'] == "Failed to remove item from cart"