# Importing the dependencies
from src.dependencies import *
from src.utils import *
from src.prompts import *
from src.system_instructions import *
from src.chitra import Chitra


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


# Create the Chitra Movie Bot Instance
chitra = Chitra(
    model_name = "gemini-1.5-flash-latest",
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain"
    },
    safety_settings = [
        {
            "category": "HARM_CATEGORY_DANGEROUS",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_NONE",
        },
    ],
    system_instruction = system_instructions[0]
)

# Home Page
@app.get("/")
def home():
    return "Hello Chitra!"

# Chatbot Endpoint
@app.post("/chat")
async def chat(query: Query):
    """ Chatbot endpoint to handle user queries."""
    try:
        if not hasattr(chat, "chitra_chat_session"):
            chat.chitra_chat_session = chitra.start_chat()

        if is_movie_recommendation_query(query.question):
            api_response = requests.post(
                "http://127.0.0.1:8000//api/movie_query",
                json={"question": query.question}
            )

            if api_response.status_code == 200:
                movie_data = api_response.json()
                chitra_response = chat.chitra_chat_session.send_message(prompts[1], movie_data) 
                
                return {"type": "text", "data": chitra_response.text}

            else:
                raise HTTPException(status_code=500, detail="Error fetching movie recommendations")
        
        else:
            chitra_response = chat.chitra_chat_session.send_message(query.question)
            return {"type": "text", "data": chitra_response.text} 
    except Exception as e:
        raise CustomException(e,sys)


# Movie Queries
@app.post("/api/movie_query", response_model=List[MovieInfo])
async def handle_movie_query(query: MovieQuery = Body(...)):
    """Processes movie queries, returning recommendations or SQL results."""
    try:
        result = get_gemini_response(query.question, prompts, database_query_based, database_key_based, movie_collection)
        processed_results = process_sql_query(result, database)
        return [MovieInfo(**movie) for movie in processed_results]

    except Exception as e1:
        raise CustomException(e1,sys)
