# Importing the dependencies
from src.dependencies import *
from main import app

# Defining the client fixture
@pytest.fixture
def client():
    return TestClient(app)

# Test Cases
def test_empty_query(client):
    """Test an empty query."""
    response = client.post("/api/movie_query", json={"question": ""})
    assert response.status_code == 422
    assert response.json() == {
        "detail": [{"loc": ["body", "question"], "msg": "field required", "type": "value_error.missing"}]
    }

def test_valid_query(client):
    """Test a valid query."""
    response = client.post("/api/movie_query", json={"question": "recommend me some movies like Avengers: Endgame"})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_invalid_query(client):
    """Test a query that won't return results."""
    response = client.post("/api/movie_query", json={"question": "this is a nonsense query that should not match any movies"})
    assert response.status_code == 200
    assert response.json() == []

def test_sql_query(client):
    """Test a query that should trigger an SQL response."""
    response = client.post("/api/movie_query", json={"question": "Show me top 5 movies based on voting average released post 2017"})  
    assert response.status_code == 200
    assert isinstance(response.json(), list) 
    assert len(response.json()) > 0
