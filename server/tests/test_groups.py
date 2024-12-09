import pytest
from unittest.mock import MagicMock
from src.app import app


# Correctly mock the database connection
@pytest.fixture
def mock_db_connection(mocker):
    mock_conn = MagicMock()
    mock_cursor = MagicMock()

    # Default responses for all queries
    mock_conn.cursor.return_value = mock_cursor
    mock_cursor.fetchone.return_value = {"id": 1, "group_code": "ABC123", "created_by_user": 1}
    mock_cursor.fetchall.return_value = [
        {"id": 1, "username": "test_user"},
        {"id": 2, "username": "another_user"}
    ]
    mock_cursor.rowcount = 1

    # Mock context management
    mock_conn.__enter__.return_value = mock_conn
    mock_conn.__exit__.return_value = False

    # Patch db connection
    mocker.patch('src.db_utils.get_db_connection', return_value=mock_conn)
    return mock_conn


# Flask test client
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


# Logging for easier debugging
def log_response(response):
    print(f"Status Code: {response.status_code}")
    print(f"JSON Response: {response.json}")


# --- Tests for Groups Routes ---

# Test group creation
def test_create_group_success(mock_db_connection, client):
    response = client.post('/api/groups/create', json={'created_by_user': 1})
    log_response(response)
    assert response.status_code == 201
    assert "group_code" in response.json


def test_create_group_missing_user(mock_db_connection, client):
    response = client.post('/api/groups/create', json={})
    log_response(response)
    assert response.status_code == 500
    assert response.json['error'] == "Missing 'created_by_user' field"

# Test joining a group
def test_join_group_success(mock_db_connection, client):
    response = client.post('/api/groups/join', json={
        'user_id': 1,
        'group_code': 'ABC123'
    })
    log_response(response)
    assert response.status_code == 200
    assert response.json['message'] == "Joined group successfully"


def test_join_group_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.post('/api/groups/join', json={
        'user_id': 1,
        'group_code': 'NONEXISTENT'
    })
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group not found"


# Test getting group users
def test_get_group_users_success(mock_db_connection, client):
    response = client.get('/api/groups/1/users')
    log_response(response)
    assert response.status_code == 200
    assert len(response.json['users']) == 2
    assert response.json['users'][0]['username'] == "test_user"


def test_get_group_users_not_found(mock_db_connection, client):
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
    assert response.json['group']['group_code'] == "ABC123"


def test_get_group_details_not_found(mock_db_connection, client):
    mock_db_connection.cursor.return_value.fetchone.return_value = None
    response = client.get('/api/groups/999')
    log_response(response)
    assert response.status_code == 404
    assert response.json['error'] == "Group not found"