# In this file, we define some utility functions that are used across the project.


def find_similar_movies(movie_title, data, movie_collection, top_k=6):
    """ 
    Function to find similar movies based on the embeddings of the movie title.
    
    Args:
        movie_title (str): The title of the movie.
        data (pd.DataFrame): The DataFrame containing the movie embeddings.
        movie_collection (chromadb.Collection): The ChromaDB collection containing the movie embeddings.
        top_k (int): The number of similar movies to return. (By default=6)
    """
    
    try:
        movie_row = data[data['title'] == movie_title]
        
        if movie_row.empty:
            return f"Movie title '{movie_title}' not found in the database."
        

        query_embedding = eval(movie_row.iloc[0]['embeddings'])
        
        results = movie_collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        final_movies = []
        for movie in results['metadatas'][0]:
            final_movies.append(movie)
            
        return final_movies[1:]
        

    except Exception as e:
        print(f"Error occurred during request: {e}")
        return []