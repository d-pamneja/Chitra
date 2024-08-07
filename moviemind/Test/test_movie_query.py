# Importing the dependencies
from src.dependencies import *
from fastapi.testclient import TestClient
from main import app
from src.utils import get_movie_title, is_valid_movie
from API.resource import chitra
from fastapi import HTTPException
import respx  
from httpx import AsyncClient


# Test Client Fixture
@pytest.fixture(scope="module")
async def async_client():
    async with AsyncClient(app=app, base_url="http://127.0.0.1:8080") as ac:
        yield ac


@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client

@pytest.fixture(autouse=True)
def reset_context():
    chitra.context_movie_title = None
    yield

# Test Cases
@pytest.mark.asyncio
async def test_chat_empty_query(async_client):
    """Test an empty query."""
    response = await async_client.post("/api/chat", json={"question": ""})
    assert response.status_code == 400
    assert response.json() == {"detail": "Query cannot be empty"}

# # @respx.mock
# # @pytest.mark.asyncio
# # async def test_movie_recommendation_success(async_client, monkeypatch):
# #     """Test a successful movie recommendation query."""
# #     movie_recommendations = [
# #         {"title": "Movie A", "keywords": "action, adventure", "review_summary": "Great action movie!"},
# #         {"title": "Movie B", "keywords": "comedy, adventure", "review_summary": "Hilarious and fun!"}
# #     ]

# #     def mock_get_movie_title(*args, **kwargs):
# #         return "Inception"
# #     monkeypatch.setattr("main.get_movie_title", mock_get_movie_title)

# #     respx.post("http://127.0.0.1:8000/api/movie_query").mock(return_value=httpx.Response(200, json=movie_recommendations))

# #     response = await async_client.post("/api/chat", json={"question": "Can you recommend some movies like Inception?"})
# #     assert response.status_code == 200
# #     assert isinstance(response.json()["data"], str)

# # # Tests
# # def test_empty_query(client):
# #     """Test an empty query."""
# #     response = client.post("/api/movie_query", json={"question": ""})
# #     assert response.status_code == 422
# #     assert response.json() == {
# #         "detail": [{"loc": ["body", "question"], "msg": "field required", "type": "value_error.missing"}]
# #     }

# # def test_valid_query(client):
# #     """Test a valid query."""
# #     response = client.post("/api/movie_query", json={"question": "recommend me some movies like Avengers: Endgame"})
# #     assert response.status_code == 200
# #     assert isinstance(response.json(), list)
# #     assert len(response.json()) > 0

# # def test_invalid_query(client):
# #     """Test a query that won't return results."""
# #     response = client.post("/api/movie_query", json={"question": "this is a nonsense query that should not match any movies"})
# #     assert response.status_code == 200
# #     assert response.json() == []

# # def test_sql_query(client):
# #     """Test a query that should trigger an SQL response."""
# #     response = client.post("/api/movie_query", json={"question": "Show me top 5 movies based on voting average released post 2017"})  
# #     assert response.status_code == 200
# #     assert isinstance(response.json(), list) 
# #     assert len(response.json()) > 0