import pytest
from unittest.mock import MagicMock
from src.app import app


# Mock the database connection and queries
@pytest.fixture
def mock_db_connection(mocker):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()

    # Mock default responses
    mock_conn.cursor.return_value = mock_cursor

    # Default fetchall and fetchone results
    mock_cursor.fetchall.return_value = [
        {"id": 1, "username": "test_user"}
    ]
    mock_cursor.fetchone.return_value = {"id": 1, "group_code": "GRP123"}

    # Default affected row count
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


# --- Tests for Groups Routes ---

# Test group creation
def test_create_group_success(mock_db_connection, client):
    response = client.post('/api/groups/create', json={
        "created_by_user": 1
    })
    log_response(response)
    assert response.status_code == 201
    assert "group_code" in response.json
    assert response.json['message'] == "Group created successfully"


def test_create_group_missing_user(mock_db_connection, client):
    response = client.post('/api/groups/create', json={})
    log_response(response)
    assert response.status_code == 500
    assert "error" in response.json


# Test joining a group
def test_join_group_success(mock_db_connection, client):
    response = client.post('/api/groups/join', json={
        "user_id": 1,
        "group_code": "GRP123"
    })
    log_response(response)
    assert response.status_code == 200
    assert response.json['message'] == "Joined group successfully"


def test_join_group_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.post('/api/groups/join', json={
        "user_id": 1,
        "group_code": "NON_EXISTENT"
    })
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group not found"


# Test getting group users
def test_get_group_users_success(mock_db_connection, client):
    response = client.get('/api/groups/1/users')
    log_response(response)
    assert response.status_code == 200
    assert len(response.json['users']) == 1
    assert response.json['users'][0]['username'] == "test_user"


def test_get_group_users_empty(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchall.return_value = []
    response = client.get('/api/groups/999/users')
    log_response(response)
    assert response.status_code == 200
    assert len(response.json['users']) == 0


# Test getting group details
def test_get_group_details_success(mock_db_connection, client):
    response = client.get('/api/groups/1')
    log_response(response)
    assert response.status_code == 200
    assert response.json['group']['group_code'] == "GRP123"


def test_get_group_details_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.get('/api/groups/999')
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group not found"