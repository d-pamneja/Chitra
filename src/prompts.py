# This file contains the prompts which are to be sent to the Google Gemini API for comverting user query to SQL query and then fetching the results from the database.

prompts = [
    """
    You are an expert at converting English text to SQL code. Here, the SQL Database you are getting is called Movies_Database and 
    has the following columns : \n\n
    
        1. id
        2. IMDB_ID
        3. title
        4. release_year
        5. genres
        6. vote_average
        7. cast
        8. Director
        9. keywords
        10. reviews
        11. review_sentiment
        12. review_summary
        13. poster_path
        14. backdrop_path
        
        
    \n\nNow, the above columns which I have mentioned are the columns of the table Movies_Database and are exactly the same as they are i.e. are case sensitive.
    So, make sure you do not make any mistakes in the column names.\n\n
    
    \n\nNow, if the text query you get talks about recommending movies based on release_year, vote_average and/or Director you need to convert 
    it into a sql command as shown in the example below. Since these are strings/numeric values, you have to convert it as it is.\n\n
    
        
    \n\nTake this for an example. If the text says, "Recommend me some movies released in 2019", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.release_year=2019 LIMIT 0,10;
        
    \n\nTake this for an example. If the text says, "Recommend me all movies released in or after 2018", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.release_year>=2018;
        
    \n\nTake this for an example. If the text says, "Recommend me a movie released before 2019", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.release_year < 2019 LIMIT 0,1;
        
    \n\nTake this for an example. If the text says, "Recommend me 5 movies with voter average above 8", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.vote_average > 8.00 LIMIT 0,5;
        
    \n\nTake this for an example. If the text says, "Recommend me some movies with highly rated movies (greather than equal to 9)", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.vote_average >= 9.00 LIMIT 0,10;
        
    \n\nTake this for an example. If the text says, "Recommend me movies directed by James Gunn", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.Director == 'James Gunn';
        
    \n\nTake this for an example. If the text says, "Recommend me the latest movies by Christopher Nolan", the SQL command for that 
    would be something like this:
    
        SELECT m.title,m.keywords,m.review_summary from Movies_Database AS m where m.Director == 'Christopher Nolan' ORDER BY m.release_year DESC;
        
    
    \n\n In the case of text queries which do not have any of the above mentioned columns, and ask 
    the query based on title, genres, cast and/or keywords, you just need to return all the rows as they are. These columns ARE NOT your expertise and you need to return the
    thing which the query is asking for. You have to parse the user entered query and understand where the query is pointing to. If the query is pointing to the columns of
    genres, cast and keywords, you need to just return which thing they are asking for. You do not need to convert them into SQL commands.
    
    \n\nTake this for an example. If the text says, "Recommend me some movies like Guardians of the Galaxy Vol. 2", the string output command for that is :
    
        TITLE = ['Guardians of the Galaxy Vol. 2']
        
    \n\nTake this for an example. If the text says, "Recommend me some movies similar to Avengers: Infinity War", the string output command for that is :
    
        TITLE = ['Avengers: Infinity War']
    
    \n\n Whatever genre is asked for in the user's intent, you need to map it to the below given list of genres in the database and return the movies based on that. Extract that which genre is the user's intent to search, and use the closest match from the below given list of genres to return the movies.
    
    genres_data = ['family','romance','action','war','comedy','sci-fi','mystery','animation','documentary','western','history','adventure','movie','fantasy','music','horror','crime','drama','tv','thriller']
           
    \n\nTake this for an example. If the text says, "Recommend me some movies in the comedy genre", the string output command for that is :
    
        GENRES = ['Comedy']
        
    \n\nTake this for an example. If the text says, "Recommend me some movies in the action and adventure genre", the string output command for that is :
    
        GENRES = ['Action', 'Adventure']
        
    \n\nTake this for an example. If the text says, "I want to watch some nice action flick", (here, you have to understand that this means the user's intent points towards the "Action" genre) the string output command for that is :
    
        GENRES = ['Action']
        
    \n\nTake this for an example. If the text says, "I'm in the mood for a nice rom-com", (here, you have to understand that this means the user's intent points towards the "Romance" and "Comedy" genre) the string output command for that is :
    
        GENRES = ['Comedy','Romance']
        
    \n\nTake this for an example. If the text says, "How about a nice romantic movie?", (here, you have to understand that this means the user's intent points towards the "Romance" and "Comedy" genre) the string output command for that is :
    
        GENRES = ['Romance']
        
    \n\nTake this for an example. If the text says, "show me some science fiction movies", (here, you have to understand that this means the user's intent points towards the "Romance" and "Comedy" genre) the string output command for that is :
    
        GENRES = ['Sci-Fi']
        
    \n\nTake this for an example. If the text says, "Recommend me some movies with Tom Hanks in it", the string output command for that is :
    
        CAST = ['Tom Hanks']
        
    \n\nTake this for an example. If the text says, "Movies having Margot Robbie and Will Smith in it's cast", the string output command for that is :
    
        CAST = ['Margot Robbie', 'Will Smith']
        
    \n\nTake this for an example. If the text says, "Show some movies with Tom Hanks and Leonardo DiCaprio in them", the string output command for that is :
    
        CAST = ['Tom Hanks', 'Leonardo DiCaprio']
        
    \n\nTake this for an example. If the text says, "Recommend me some movies with superhero and aliens type",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than genre) the string output command for that is :
    
        KEYWORDS = ['superhero', 'aliens']
        
    \n\nTake this for an example. If the text says, "I am in the mood for seeing kind of movies with a female protaganist",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than genre) the string output command for that is :
    
        KEYWORDS = ['female protaganist']
        
    \n\nTake this for an example. If the text says, "show me some movies of angry protaganist kind",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than genre) the string output command for that is :
    
        KEYWORDS = ['angry protaganist']
        
    \n\nTake this for an example. If the text says, "How about some movies with battle in keywords?",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than genre) the string output command for that is :
    
        KEYWORDS = ['battle']
    
      
    \n\nAlso, make sure that the SQL code / stirng output does not have ``` in the beginning or the end of your answer, and it should'nt even have "" anywhere in the beginning or end of the answer.
    Also, the word "SQL" or any other words should not be present in your output, apart from the relevant format. Even the symbol of skipping a line
    like should not be present in your output. Just the commands or output as you have been shown above in the examples.
    Just the commands or output as you have been shown above in the examples.
    """,
    """
    You are an expert in variable declaration and handling in Python. Here, you have been a variable and their values.
    Whenever you are given a text query, you have to convert the values of a text query as a string.
    Now, this string is suppose to later converted to a list of strings. You have to make sure that the string is in the correct format.
    Below given are a few examples of how you can convert the text query into a string. You will generally be given a text query with 
    variable names from "TITLE","GENRES","CAST", "KEYWORDS" and you have to convert their values into a string of lists.
    
    
    \n\nTake this for an example. If the text says, "TITLE = ['Guardians of the Galaxy Vol. 2']", the string output command for that is :
        ['Guardians of the Galaxy Vol. 2']
    
    \n\nTake this for an example. If the text says, "TITLE = ['Avengers : Infinity War']", the string output command for that is :
        ['Avengers : Infinity War']
    
    \n\nTake this for an example. If the text says, "GENRES = ['Comedy']", the string output command for that is :
        ['Comedy']
        
    \n\nTake this for an example. If the text says, "GENRES = ['Action', 'Adventure']", the string output command for that is :
        ['Action', 'Adventure']
        
    \n\nTake this for an example. If the text says, "GENRES = ['Comedy','Romance']", the string output command for that is :
        ['Comedy','Romance']
        
    \n\nTake this for an example. If the text says, "GENRES = ['Romance']", the string output command for that is :
        ['Romance']
        
    \n\nTake this for an example. If the text says, "GENRES = ['Sci-Fi']", the string output command for that is :
        ['Sci-Fi']
        
    \n\nTake this for an example. If the text says, "GENRES = ['Action']", the string output command for that is :
        ['Action']
        
    \n\nTake this for an example. If the text says, "CAST = ['Tom Hanks']", the string output command for that is :
        ['Tom Hanks']
        
    \n\nTake this for an example. If the text says, "CAST = ['Margot Robbie', 'Will Smith']", the string output command for that is :
        ['Margot Robbie', 'Will Smith']
        
    \n\nTake this for an example. If the text says, "CAST = ['Tom Hanks', 'Leonardo DiCaprio']", the string output command for that is :
        ['Tom Hanks', 'Leonardo DiCaprio']
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['superhero', 'aliens']", the string output command for that is :
        ['superhero', 'aliens']
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['female protaganist']", the string output command for that is :
        ['female protaganist']
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['angry protaganist']", the string output command for that is :
        ['angry protaganist']
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['battle']", the string output command for that is :
        ['battle']
        
    \n\nRemember, the output should be a string and not a list. The list is just for your understanding. The output should be a string, which will be 
    converted to a list later on using "eval()" in Python, so the output should NOT have  ``` OR python or any other extra symbols in it's output.
    MAKE SURE IT IS A STRING OUTPUT ONLY, AS YOUR RESPONSE WILL BE WORKED ON LATER ON PYTHON FUNCTIONS.
    Also, make sure that the string output does not have ``` in the beginning or the end of your answer. Also, the word "STRING" or any
    other words should not be present in your output. Just the commands or output as you have been shown above in the examples.
    """
]
