# In this file, we define some utility functions that are used across the project.

# Importing the required dependecnies.
from .dependencies import *


keyword_data_path = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/CHROMA_DATABASE"
client_key = chromadb.PersistentClient(path = keyword_data_path)
movie_collection = client_key.get_collection("MOVIES")

# movie_collection = client_key.get_collection("MOVIES")

# keyword_data_path = "../Chroma_DB"
# client_key = chromadb.PersistentClient(path = keyword_data_path)
# movie_collection = client_key.get_collection("Movies")

def find_similar_movies(movie_title, data, movie_collection, top_k=6):
    """ 
    Function to find similar movies based on the embeddings of the movie title.
    
    Args:
        movie_title (str): The title of the movie.
        data (pd.DataFrame): The DataFrame containing the movie embeddings.
        movie_collection (chromadb.Collection): The ChromaDB collection containing the movie embeddings.
        top_k (int): The number of similar movies to return. (By default=6)
        
    Returns:
        list: The list of dictionaries containing the similar movies.
    """
    
    try:
        movie_row = data[data['title'] == movie_title]
        
        if movie_row.empty:
            logging.info(f"{movie_title}' not found in the database.")
            raise CustomException(f"Movie title '{movie_title}' not found in the database.",sys)

        query_embedding = eval(movie_row.iloc[0]['embeddings'])
        
        results = movie_collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        final_movies = []
        for movie in results['metadatas'][0]:
            final_movies.append(movie)
            
        logging.info(f"Similar movies to '{movie_title}' found successfully.")
        return final_movies[1:]
        

    except Exception as e1:
        raise CustomException(e1,sys)
    

database = "/Users/dhruv/Desktop/Machine_Learning/Projects/Chitra_Movie_Bot/SQL_Database/Movies.db"
database_key_based = pd.read_sql("SELECT m.* FROM Movies_Key_Based AS m", sqlite3.connect(database))
database_query_based = pd.read_sql("SELECT m.* FROM Movies_Database AS m", sqlite3.connect(database))


def process_sql_query(sql_command,db):
    """
    Function to process the SQL query and yield the results from the databases.
    
    Args:
        sql_command (str): The SQL command to be executed.
        db (str): The path to the database.
        
    Returns:
        list: The list of dictionaries containing the results of the SQL query.
    """
    try: 
        if(type(sql_command)==str):   
            
            con = sqlite3.connect(db)
            cur = con.cursor()
            cur.execute(sql_command)
            
            rows = cur.fetchall()
            
            column_names = [description[0] for description in cur.description]
            list_of_dicts = [dict(zip(column_names, row)) for row in rows]

            con.close()
            
            logging.info(f"SQL query {sql_command} executed successfully.")
            return list_of_dicts if type(list_of_dicts) == list else []
        
        elif type(sql_command)==list:
            return sql_command
        
    except Exception as e1:
        raise CustomException(e1,sys)
    


query_based_keywords = ['genre', 'genres', 'cast', 'actor', 'actress', 'keyword','in it','in them','type','kind']
title_based_keywords = ["title","similar","like"]


def subArray(arr1,arr2):
    """
    Function to check if arr1 is a subarray of arr2, with the help of the map function to reduce the time complexity.
    
    Args:
        arr1 (list): The first array (subarray to be checked)
        arr2 (list): The second array (main array)
        
    Returns:
        bool: The boolean value indicating if arr1 is a subarray of arr2 or not.
    """
    mp = map(str.lower,arr2)
    
    for i in arr1:
        if(i.lower() not in mp):
            return False
        
    return True


def get_gemini_response(question,prompts,database_query_based,database_key_based,movie_collection):
    """
    Processes a user's question about movies using a two-tiered approach:
    
    1. Initial Classification: The Gemini LLM model (`gemini-1.5-flash-latest`) determines the primary intent of the question (e.g., SQL query, genre search, cast search, keyword search, title search).

    2. Targeted Response:
        a. SQL Query: If the intent is a SQL query, the function directly executes it and returns the results.
        b. Keyword-Based Search (Genre, Cast, Keyword):  The function prompts the LLM for relevant keywords, then filters the movie database based on these keywords and returns matching movies.
        c. Title-Based Search: The function prompts the LLM for a movie title, then uses a similarity search in ChromaDB to find and return related movies.

    Args:
        question (str): The user's question about movies.
        prompts (list): A list of prompt templates for the LLM, guiding its responses in each tier.
        database_query_based (pd.DataFrame): The SQL database containing movie details for query-based searches.
        database_key_based (pd.DataFrame): The SQL database containing movie details for key-based searches, which matches the ChromaDB embeddings.
        movie_collection (chromadb.Collection): The ChromaDB collection containing the movie embeddings.

    Returns:
        list or str:
            - If the intent is a SQL query, a list of dictionaries containing movie details (title, keywords, review_summary).
            - If the intent is keyword-based or title-based search, a list of dictionaries containing movie details (title, keywords, review_summary) limited to the top 10 results.
            - If an error occurs, an empty list (indicating no results or an error). 
    """
    try:
        # Initialize LLM model and safety settings
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        safe = [
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
        ]
        
        # First-level LLM response to determine intent
        response_level1 = model.generate_content([prompts[0],question],safety_settings = safe)
        
        if("SELECT" in response_level1.text):
            return response_level1.text.replace('\n', '').replace(';', '')
        
        all_movies = database_query_based.values
        
        # Handle specific-based searches (genre, cast, keyword) from SQL Database
        for query_keyword in query_based_keywords:
            if(query_keyword in question.lower()):
                if(query_keyword == "genres" or query_keyword.lower() == "genre"):
                    response_level2 = model.generate_content([prompts[1],response_level1.text],safety_settings = safe)
                    query_genres = [genre.lower() for genre in eval(response_level2.text)]
                    
                    final_movie_titles = []
                    for movie in all_movies:
                        current_movie_genre = [genre.lower() for genre in eval(movie[4])]
                        if(subArray(query_genres,current_movie_genre)==True):
                            movie_details = {'title' : movie[2], 'keywords' : movie[8], 'review_summary' : movie[11]}
                            final_movie_titles.append(movie_details)
                        
                    logging.info(f"Movies found for genres {query_genres}.")
                    return final_movie_titles[:10]
                
                elif(query_keyword.lower() == "cast" or query_keyword.lower() == "actor" or query_keyword.lower() == "actress" or query_keyword.lower() == "in it" or query_keyword.lower() == "in them"):
                    response_level2 = model.generate_content([prompts[1],response_level1.text],safety_settings = safe)
                    query_cast = [cast.lower() for cast in  eval(response_level2.text)]
                    
                    final_movie_titles = [] 
                    for movie in all_movies:
                        current_movie_cast = [cast.lower() for cast in eval(movie[6])]
                        if(subArray(query_cast,current_movie_cast)==True):
                            movie_details = {'title' : movie[2], 'keywords' : movie[8], 'review_summary' : movie[11]}
                            final_movie_titles.append(movie_details)
                        
                    logging.info(f"Movies found for cast {query_cast}.")
                    return final_movie_titles[:10]
                
                elif(query_keyword.lower() == "keyword" or query_keyword.lower() == "type" or query_keyword.lower() == "kind"):
                    response_level2 = model.generate_content([prompts[1],response_level1.text],safety_settings = safe)
                    query_keywords = [keyword.lower() for keyword in eval(response_level2.text)]
                    
                    final_movie_titles = []
                    for movie in all_movies:
                        current_movie_keywords = [keyword.lower() for keyword in eval(movie[8])]
                        if(subArray(query_keywords,current_movie_keywords)==True):
                            movie_details = {'title' : movie[2], 'keywords' : movie[8], 'review_summary' : movie[11]}
                            final_movie_titles.append(movie_details)
                        
                    logging.info(f"Movies found for keywords {query_keywords}.")
                    return final_movie_titles[:10]
                
                
        # Handle title-based searches from Chroma Database
        for query_keyword in title_based_keywords:
            if(query_keyword.lower() in question.lower()):
                response_level2 = model.generate_content([prompts[1],response_level1.text],safety_settings = safe)
                query_title = eval(response_level2.text)[0]
                
                return find_similar_movies(query_title,database_key_based,movie_collection,6)    
            
    except Exception as e1:
        raise CustomException(e1,sys)
    
