import pytest
from unittest.mock import MagicMock
from src.app import app


# Mock database connection and queries
@pytest.fixture
def mock_db_connection(mocker):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()

    # Default responses
    mock_conn.cursor.return_value = mock_cursor
    mock_cursor.fetchall.return_value = [
        {"id": 1, "username": "test_user", "group_id": 1}
    ]
    mock_cursor.fetchone.return_value = {"id": 1, "username": "test_user", "group_id": 1}
    mock_cursor.rowcount = 1

    # Mock context management
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.__exit__.return_value = False

    # Patch database connection
    mocker.patch('src.db_utils.get_db_connection', return_value=mock_conn)
    return mock_conn


# Flask test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


# Helper function for response logging
def log_response(response):
    print(f"Status Code: {response.status_code}")
    print(f"JSON Response: {response.json}")


# --- Tests for Users Routes ---

# Test user registration
def test_register_user_success(mock_db_connection, client):
    response = client.post('/api/users/register', json={
        "username": "new_user",
        "password_hash": "securepassword",
        "group_id": 1
    })
    log_response(response)
    assert response.status_code == 201
    assert response.json['message'] == "User registered successfully"


def test_register_user_missing_fields(mock_db_connection, client):
    response = client.post('/api/users/register', json={"username": "missing_password"})
    log_response(response)
    assert response.status_code == 500
    assert "error" in response.json


# Test user login
def test_login_user_success(mock_db_connection, client):
    response = client.post('/api/users/login', json={
        "username": "test_user",
        "password_hash": "securepassword"
    })
    log_response(response)
    assert response.status_code == 200
    assert response.json['user']['username'] == "test_user"


def test_login_user_invalid_credentials(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.post('/api/users/login', json={
        "username": "wrong_user",
        "password_hash": "wrongpassword"
    })
    log_response(response)
    assert response.status_code == 401
    assert response.json['error'] == "Invalid credentials"


# Test getting user details
def test_get_user_details_success(mock_db_connection, client):
    response = client.get('/api/users/1')
    log_response(response)
    assert response.status_code == 200
    assert response.json['user']['username'] == "test_user"


def test_get_user_details_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.get('/api/users/999')
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "User not found"


# Test getting all users
def test_get_all_users_success(mock_db_connection, client):
    response = client.get('/api/users')
    log_response(response)
    assert response.status_code == 200
    assert len(response.json['users']) == 1


# Test getting user group
def test_get_user_group_success(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = {
        "id": 1, "group_code": "GRP123"
    }
    response = client.get('/api/users/1/group')
    log_response(response)
    assert response.status_code == 200
    assert response.json['group']['group_code'] == "GRP123"


def test_get_user_group_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.get('/api/users/999/group')
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group not found for this user"