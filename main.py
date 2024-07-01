# # from flask import Flask
# # from fastapi.middleware.wsgi import WSGIMiddleware
# # from API.resource import app as fastapi_app

# # app = Flask(__name__)

# # # Create the WSGI middleware with the FastAPI app
# # wsgi_app = WSGIMiddleware(fastapi_app)

# # # Define a Flask route to serve the FastAPI app through WSGI
# # @app.route('/api/<path:path>')
# # def fastapi_endpoint(path):
# #     print("FastAPI endpoint reached:", path)
# #     return wsgi_app


# # @app.route('/')
# # def home():
# #     return "Hello Chitra!"

# # if __name__ == "__main__":
# #     app.run(debug=True, port=8000)

# from flask import Flask
# from src.dependencies import *
# from fastapi.middleware.wsgi import WSGIMiddleware
# from API.resource import app as fastapi_app

# app = Flask(__name__)

# # Create the WSGI middleware with the FastAPI app
# wsgi_app = WSGIMiddleware(fastapi_app)

# # Define a Flask route to serve the FastAPI app through WSGI
# @app.route('/api/<path:path>')
# def fastapi_endpoint(path):
#     print("FastAPI endpoint reached:", path)
#     return wsgi_app


# @app.route('/')
# def home():
#     return "Hello Chitra!"

# if __name__ == "__main__":
#     app.run(debug=True, port=8000)


from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel, Field
from typing import List
import chromadb
import sqlite3
import pandas as pd
import sys

from src.utils import *
from src.prompts import *


# Initialising the API from FastAPI
app = FastAPI(prefix="/api")

# Data Models for Input and Output
class MovieQuery(BaseModel):
    question: str = Field(..., description="The user's question about movies.")

class MovieInfo(BaseModel):
    title: str
    keywords: str = None
    review_summary: str = None


# Load Data (ChromaDB and SQLite)
keyword_data_path = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/CHROMA_DATABASE" 
client_key = chromadb.PersistentClient(path=keyword_data_path)
movie_collection = client_key.get_collection("MOVIES")

database = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/SQL_Database/Movies.db"
database_key_based = pd.read_sql_query("SELECT m.* FROM Movies_Key_Based AS m", sqlite3.connect(database))
database_query_based = pd.read_sql_query("SELECT m.* FROM Movies_Database AS m", sqlite3.connect(database))



# Main API Endpoint
@app.get("/")
def home():
    return "Hello Chitra!"


@app.post("/api/movie_query", response_model=List[MovieInfo])
async def handle_movie_query(query: MovieQuery = Body(...)):
    """Processes movie queries, returning recommendations or SQL results."""
    try:
        result = get_gemini_response(query.question, prompts, database_query_based, database_key_based, movie_collection)
        processed_results = process_sql_query(result, database)
        return [MovieInfo(**movie) for movie in processed_results]

    except CustomException as e1:
        raise CustomException(e1,sys)


# Run the App (Optional: Include for direct execution)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
