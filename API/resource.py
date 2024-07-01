# # Importing the dependencies
# from src.dependencies import *
# from src.utils import *
# from src.prompts import *

# keyword_data_path = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/CHROMA_DATABASE"
# client_key = chromadb.PersistentClient(path = keyword_data_path)
# movie_collection = client_key.get_collection("MOVIES")

# database = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/SQL_Database/Movies.db"
# database_key_based = pd.read_sql("SELECT m.* FROM Movies_Key_Based AS m", sqlite3.connect(database))
# database_query_based = pd.read_sql("SELECT m.* FROM Movies_Database AS m", sqlite3.connect(database))


# # Initialising the API from FastAPI
# app = FastAPI(prefix="/api")

# class MovieQuery(BaseModel):
#     question: str = Field(..., description="The user's question about movies.")

# class MovieInfo(BaseModel):
#     title: str
#     keywords: str
#     review_summary: str


# @app.post("/movie_query", response_model=List[MovieInfo])
# async def handle_movie_query(query: MovieQuery = Body(...)):
#     """
#     Endpoint for processing movie queries.

#     Receives a user question and LLM prompts, then calls the `get_gemini_response` function to get movie recommendations or SQL query results.
#     """
#     try:
#         result = get_gemini_response(query.question,prompts,database_query_based,database_key_based,movie_collection)
#         processed_results = process_sql_query(result, database)
        
#         return [MovieInfo(**movie) for movie in processed_results]

#     except CustomException as e:
#         raise HTTPException(status_code=500, detail=str(e))

# Importing the dependencies
from src.dependencies import *
from src.utils import *
from src.prompts import *
# Importing the chromadb database
keyword_data_path = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/CHROMA_DATABASE"
client_key = chromadb.PersistentClient(path = keyword_data_path)
movie_collection = client_key.get_collection("MOVIES")

# Importing the SQL database
database = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/SQL_Database/Movies.db"
database_key_based = pd.read_sql_query("SELECT m.* FROM Movies_Key_Based AS m", sqlite3.connect(database))
database_query_based = pd.read_sql_query("SELECT m.* FROM Movies_Database AS m", sqlite3.connect(database))


# Initialising the API from FastAPI
app = FastAPI(prefix="/api")

class MovieQuery(BaseModel):
    question: str = Field(..., description="The user's question about movies.")

class MovieInfo(BaseModel):
    title: str
    keywords: str
    review_summary: str


@app.post("/movie_query", response_model=List[MovieInfo])
async def handle_movie_query(query: MovieQuery = Body(...)):
    """
    Endpoint for processing movie queries.

    Receives a user question and LLM prompts, then calls the `get_gemini_response` function to get movie recommendations or SQL query results.
    """
    try:
        result = get_gemini_response(query.question,prompts,database_query_based,database_key_based,movie_collection)
        processed_results = process_sql_query(result, database)
        
        return [MovieInfo(**movie) for movie in processed_results]

    except CustomException as e:
        raise HTTPException(status_code=500, detail=str(e))
