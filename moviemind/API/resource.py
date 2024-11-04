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
    
class ChatMessage(BaseModel):
    user: str = Field(..., description="The user's message.")
    chitra: str = Field(..., description="Chitra's response.")

class Conversation(BaseModel):
    date: datetime = Field(..., description="Date and time of the conversation.")
    conversation: List[ChatMessage] = Field(..., description="List of messages in the conversation.")
    feedback: Optional[str] = Field(None, description="User feedback on the conversation (optional).")
        
class ConversationAnalysisQuery(BaseModel):
    user_id: str = Field(..., description="The user's ObjectId.")
    user_name: str = Field(..., description="The user's name.")
    date: datetime = Field(..., description="Date and time of the query.")
    conversations: List[Conversation] = Field(..., description="List of conversations for analysis.")

class ConversationSummary(BaseModel):
    conversation_date: datetime
    main_topics: List[str]
    sentiment: float

class UserFeedback(BaseModel):
    date: datetime
    feedback_type: str
    comment: str

class ConversationAnalysisResponse(BaseModel):
    user_id: str = Field(..., description="The user's ID.")
    user_name: str = Field(..., description="The user's name.")
    analysis_date: datetime = Field(..., description="The date of the analysis.")
    overall_sentiment: float = Field(..., description="The overall sentiment score of the conversations.")
    preferred_genres: Dict[str,float] = Field(..., description="A dictionary of the user's preferred genres and their scores.")
    liked_actors: List[str] = Field(..., description="A list of actors the user likes.")
    disliked_actors: List[str] = Field(..., description="A list of actors the user dislikes.")
    liked_directors: List[str] = Field(..., description="A list of directors the user likes.")
    disliked_directors: List[str] = Field(..., description="A list of directors the user dislikes.")
    positive_keywords: List[str] = Field(..., description="A list of positive keywords from the conversations.")
    negative_keywords: List[str] = Field(..., description="A list of negative keywords from the conversations.")
    conversation_summaries: List[ConversationSummary] = Field(..., description="Summaries of each conversation with main topics and sentiment.")
    overall_conversation_analysis: str = Field(..., description="An overall analysis of the user's conversations and preferences.")
    feedbacks: List[UserFeedback] = Field(..., description="List of user feedbacks.")
    feedbacks_analysis: str = Field(..., description="An overall analysis of the user's feedbacks.")


# Load Data (ChromaDB and SQLite)
keyword_data_path = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/moviemind/CHROMA_DATABASE" 
client_key = chromadb.PersistentClient(path=keyword_data_path)
movie_collection = client_key.get_collection("MOVIES")

database = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/moviemind/SQL_Database/Movies.db"
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

# Create the Conversation Analysis Bot Instance
conversation_analyst = genai.GenerativeModel(
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
    system_instruction = system_instructions[2]
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
        if(not chitra.chat_session):
            chitra.chat_session = chitra.start_chat()
            
        if(not query.question): 
            raise HTTPException(status_code=400, detail="Query cannot be empty")

        if(is_movie_recommendation_query(query.question, prompts)):
            try:
                movie_title = get_movie_title(query.question, prompts, chitra.context_movie_title)
                
                if(not movie_title or not is_valid_movie(movie_title)):
                    if(not chitra.context_movie_title):
                        chitra.context_movie_title = None
                    else:
                        movie_title = chitra.context_movie_title
                else:
                    if(movie_title != chitra.context_movie_title):
                        chitra.context_movie_title = movie_title
                    
                movie_query = MovieQuery(question=query.question)
                logging.info(f"Movie query: {movie_query}")
                
                api_response = await handle_movie_query(movie_query)
                logging.info(f"API response: {api_response}")
                
                if(type(api_response)!=list): 
                    raise HTTPException(status_code=500, detail="Error fetching or processing movie recommendations")        
                
                
                chitra_response = chitra.send_message(message = api_response,additional_context = prompts[1])       
                
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=503, detail=f"Service Unavailable: {e}")
            except CustomException as e: 
                raise HTTPException(status_code=400, detail=str(e)) 


        elif(is_movie_discussion_query(query.question, prompts)):
            try:
                movie_title = get_movie_title(query.question, prompts, chitra.context_movie_title)
                    
                if(not movie_title or not is_valid_movie(movie_title)):
                    if(not chitra.context_movie_title):
                        chitra.context_movie_title = None
                    else:
                        movie_title = chitra.context_movie_title
                else:
                    if(movie_title != chitra.context_movie_title):
                        chitra.context_movie_title = movie_title

                
                movie_discussion_query = MovieDiscussionQuery(question=query.question, movie_title = movie_title)
                logging.info(f"Movie discussion query: {movie_discussion_query}")
                
                api_response = await handle_movie_discussion(movie_discussion_query)
                logging.info(f"API response: {api_response}")
                
                if(type(api_response)!=dict): 
                    raise HTTPException(status_code=500, detail="Error fetching or processing movie recommendations") 
                
                return {"type": "text", "data": api_response["data"]}
            
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=503, detail=f"Service Unavailable: {e}")
            except CustomException as e: 
                raise HTTPException(status_code=400, detail=str(e)) 
            
        else:
            chitra.context_movie_title = None
            try:
                chitra_response = chitra.send_message(query.question)
            except requests.exceptions.RequestException as e:
                raise HTTPException(status_code=503, detail=f"Service Unavailable: {e}")
            except CustomException as e: 
                raise HTTPException(status_code=400, detail=str(e)) 


        global_chat_history.append({"user": query.question, "chitra": chitra_response.text})
        return {"type": "text", "data": chitra_response.text}

    except CustomException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@app.get("/chat_history", response_model=List[Dict[str, str]])
async def get_chat_history():
    """
    Returns the chat history of the Chitra bot.

    Raises:
        HTTPException (404 Not Found): If there is no chat history available.
    """
    if not global_chat_history:  
        raise HTTPException(status_code=404, detail="No chat history available.")

    return global_chat_history

@app.get("/current_movie", response_model=str)
async def get_current_movie():
    """
    Returns the current movie being discussed by the Chitra bot.

    Raises:
        HTTPException (404 Not Found): If no movie is being discussed.
    """
    if chitra.context_movie_title is None:  
        raise HTTPException(status_code=404, detail="No movie currently being discussed.")

    return chitra.context_movie_title

# Movie Queries
@app.post("/api/movie_query", response_model=List[MovieInfo])
async def handle_movie_query(query: MovieQuery = Body(...)):
    """Processes movie queries, returning recommendations or SQL results."""
    try:
        logging.info(f"Idhar Hoon Gandu")
        result = get_gemini_response(query.question, prompts, database_query_based, database_key_based, movie_collection)
        processed_results = process_sql_query(result, database)

        return [MovieInfo(**movie) for movie in processed_results]

    except Exception as e:
        logging.error(f"Error in handle_movie_query: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


# Movie Discussions
@app.post("/api/movie_discussion", response_model=MovieDiscussionResponse)
async def handle_movie_discussion(query: MovieDiscussionQuery = Body(...)):
    """Processes movie discussion queries, returning a response from the Chitra bot."""
    try:
        response = get_movie_discussion_response(query.movie_title, query.question, movie_discussion,database)

        logging.info(f"Movie discussion response: {response}")
        return {"type": "text", "data": response}
    except CustomException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e: 
        logging.error(f"Error in handle_movie_discussion: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

# Conversation Analysis
@app.post("/api/conversation_analysis",response_model = ConversationAnalysisResponse)
async def conversation_analysis(query: ConversationAnalysisQuery = Body(...)):
    """Processes conversation analysis queries, returning an analysis of the user's conversations."""
    try:
        if(query.user_id is None or query.user_name is None or query.date is None or query.conversations is None):
            raise HTTPException(status_code=400, detail="Invalid request body")
        
        response = get_gemini_analysis_json(query, conversation_analyst)

        logging.info(f"Conversation analysis response: {response}")
        analysis_json = json.loads(response)
        if(type(analysis_json)!=dict): 
            raise HTTPException(status_code=500, detail="Error fetching or processing conversation analysis")
        
        return ConversationAnalysisResponse(**analysis_json)

    except CustomException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e: 
        logging.error(f"Error in conversation_analysis: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")