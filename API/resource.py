# Importing the dependencies
from src.dependencies import *
from src.utils import *
from src.prompts import *
from src.system_instructions import *
from src.chitra import Chitra


# Initialising the API from FastAPI and APIRouter
app = FastAPI(prefix="/api")
movie_router = APIRouter()

# Data Models for Input and Output
class ChitraQuery(BaseModel):
    question: str = Field(..., description="The user's query to Chitra Bot.")
    
class ChitraResponse(BaseModel):
    type: str
    data: str
    
class MovieQuery(BaseModel):
    question: str = Field(..., description="The user's question about movies.")

class MovieInfo(BaseModel):
    title: str
    keywords: str = None
    review_summary: str = None
    
class MovieDiscussionQuery(BaseModel):
    question: str = Field(..., description="The user's question about movies.")
    movie_title: str = Field(..., description="The title of the movie being discussed.")
    
class MovieDiscussionResponse(BaseModel):
    type: str
    data: str


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

global_chat_history = []


# Create the Movie Discussion Bot Instance
movie_discussion = genai.GenerativeModel(
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
    system_instruction = system_instructions[1]
)


# Home Page
@app.get("/")
def home():
    return "Hello Chitra!"

# Chatbot Endpoint
        
@app.post("/api/chat", response_model=ChitraResponse)
async def chat(query: ChitraQuery = Body(...)):
    """Chatbot endpoint to handle user queries."""
    try:
        if not chitra.chat_session:
            chitra.chat_session = chitra.start_chat()

        if(is_movie_recommendation_query(query.question, prompts)):
            try:
                movie_query = MovieQuery(question=query.question)
                logging.info(f"Movie query: {movie_query}")
                
                api_response = await handle_movie_query(movie_query)
                logging.info(f"API response: {api_response}")
                
                if(type(api_response) != list):
                    raise HTTPException(status_code=500, detail=f"Error fetching movie recommendations: {api_response.text}")
                
                
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=500, detail=f"Error fetching movie recommendations: {e}")


            chitra_response = chitra.send_message(message = api_response,additional_context = prompts[1])
        elif(is_movie_discussion_query(query.question, prompts)):
            try:
                movie_title = get_movie_title(query.question,prompts)
                movie_discussion_query = MovieDiscussionQuery(question=query.question, movie_title = movie_title)
                logging.info(f"Movie discussion query: {movie_discussion_query}")
                
                api_response = await handle_movie_discussion(movie_discussion_query)
                logging.info(f"API response: {api_response}")
                
                if(type(api_response) != dict):
                    raise HTTPException(status_code=500, detail=f"Error fetching movie discussion response: {api_response}")
                
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=500, detail=f"Error fetching movie discussion response: {e}")
            
            # chitra_response = {"type": "text", "text": api_response["data"]}
            chitra_response = chitra.send_message(message = api_response,additional_context = prompts[1])
        else:
            chitra_response = chitra.send_message(query.question)

        global_chat_history.append({"user": query.question, "chitra": chitra_response.text})
        logging.info(f"chat history appended: {global_chat_history}")

        return {"type": "text", "data": chitra_response.text}

    except CustomException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@app.get("/chat_history", response_model=List[Dict[str, str]])
async def get_chat_history():
    """Returns the chat history of the Chitra bot."""
    return global_chat_history

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

# Movie Discussions
@app.post("/api/movie_discussion", response_model=MovieDiscussionResponse)
async def handle_movie_discussion(query: MovieDiscussionQuery = Body(...)):
    """Processes movie discussion queries, returning a response from the Chitra bot."""
    try:
        response = get_movie_discussion_response(query.movie_title, query.question, movie_discussion,database)
        logging.info(f"Movie discussion response: {response}")
        return {"type": "text", "data": response}
    except Exception as e:
        raise CustomException(e,sys)
