# This file contains the prompts which are to be sent to the Google Gemini API.

prompts = [
    """
    You will be given a user message as input. Your task is to classify the message into one of the following categories:

    \n1. True : If the message indicates a request for movie recommendations based on specific criteria like genre, actors, directors, keywords, or title similarity. If it says words like "recommend", "suggest", "show me", "movies with", "similar to", etc. This means the user is looking for movie recommendations based on specific criteria.

    \n2. False :  If the message is a general comment, question, or statement related to movies but not a direct request for recommendations. This means something more abstract. Basically, if it is NOT INQUIRING about movie recommendations based on specific criteria, it is False.

    Basically, the whole idea is to check whether the user is asking for a movie recommendation or not. Here are some examples to guide you:

    Here are some examples to guide you:

    | Message                                                                   | Category               |
    | ------------------------------------------------------------------------ | ---------------------- |
    | "I love sci-fi movies."                                                  | general_conversation |
    | "What are some good comedies from the 90s?"                                | movie_query           |
    | "Can you recommend movies with Leonardo DiCaprio?"                        | movie_query           |
    | "I'm in the mood for something funny and heartwarming."                    | general_conversation |
    | "What are your thoughts on the latest Marvel movie?"                      | general_conversation |
    | "Show me some movies similar to The Matrix."                              | movie_query           |
    | "I'm not a big fan of horror movies."                                     | general_conversation |
    | "Can you suggest movies with strong female leads?"                         | movie_query           |
    | "What's your favorite movie of all time?"                                 | general_conversation |
    | "Recommend me some movies with high ratings and positive reviews."         | movie_query           |
    | "sure recommend me some movies in the action genre"                        | movie_query          |
    | "recommend movies with good romance in it "                                 | movie_query          |

    Please note that the user's queries can vary in complexity and specificity. Be prepared to handle a wide range of requests. You will be given a query based on 
    which you have to classify the message into one of the above categories.

    You just have to return a string with either True or False, based on the classification of the input message. Do not have any " or ' in the response, or even an extra space, just the word True or False.
    This string will be matched with a local function, so make sure to return one of the exact string as mentioned above.
    """,
    """
    As you can see, you are getting a list of MovieInfo objects, where each object contains the title, keywords, and review_summary of a movie. This is basically the API response back from the local movie database. You have to present the top movie recommendations to the user in the following format:
        \t* You will be getting a list of MovieInfo objects, where each object has the following three keys : 
            \t\t * title : The title of the movie
            \t\t * keywords : The keywords of the movie
            \t\t * review_summary : The review summary of the movie (basically, a summary of what the audiences generally think about the movie)
        \t* You have to present the recommendations in the following format:
            \t\t - You will present all titles of each movie in a numbered list.
            \t\t - Below each title, you will present a quick summary of the movie, highlighting the keywords and the review summary. basically, you will try to justify why the movie is recommende, using these two fields. This can be a one-liner or a couple of lines, however it just has to be a quick comment on why the movie is recommended, and will the user like it.
            
    \nHere is an example of how you can present the recommendations to the user: (THIS IS JUST AN EXAMPLE, the actual recommendations will be different, DO NOT COPY THIS. This is just to show you how you can present the recommendations)
        \t1. Avengers: Infinity War
        \t\t A superhero ensemble cast with a compelling narrative and impressive action sequences. This movie is recommended for fans of the Marvel Cinematic Universe who enjoy epic battles, emotional stakes, and a touch of humor. Be warned, the ending might leave you on a cliffhanger!
        \n
        \t2. Spider-Man: Into the Spider-Verse
        \t\tA groundbreaking animation style, vibrant soundtrack, and a unique take on the Spider-Man mythos. This movie is recommended for animation enthusiasts, comic book fans, and anyone who enjoys a fresh, creative approach to superhero storytelling.
        \n
        \t3. Wonder Woman
        \t\tA refreshing female-led superhero film with stunning visuals and a compelling World War I setting. Recommended for those who enjoy action-packed movies with a strong female lead and a touch of romance.
        \n
        \t4. Incredibles 2    
        \t\tA family-friendly animated adventure filled with humor, heart, and thrilling action. Recommended for audiences of all ages who enjoy the superhero genre and are looking for an entertaining watch. However, be aware that it might not be as original as the first film.
        \n
        \t5. Captain Marvel
        \t\tA visually entertaining addition to the Marvel Cinematic Universe with a strong female protagonist. Recommended for action fans and Marvel enthusiasts. However, be prepared for a mixed bag of opinions on the plot and character development.
        \n
        
    In essence, you have to parse through the list to extract information about each particular movie from the list and you have to present the recommendations in a similar format, ensuring that the user gets a quick overview of each movie along with the title. After all this, you can ask the user if they would like more recommendations or if they have any specific preferences they would like to explore further.
    Basically, keep the conversation engaging and informative, and make sure the user feels excited about the movie recommendations you provide!
    """,
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
        
    \n Note : In case of cast, even if the cast members name's starting letter for name and surname is in lowercase, by default convert it to upper case, some examples have been given below for your understanding. 
    \n\nTake this for an example. If the text says, "Recommend me some movies with Tom Hanks in it", the string output command for that is :
    
        CAST = ['Tom Hanks']
        
    \n\nTake this for an example. If the text says, "Movies having margot robbie and will smith in it's cast", the string output command for that is :
    
        CAST = ['Margot Robbie', 'Will Smith']
        
    \n\nTake this for an example. If the text says, "Show some movies with Tom Hanks and leonardo dicaprio in them", the string output command for that is :
    
        CAST = ['Tom Hanks', 'Leonardo DiCaprio']
        
    \n\nTake this for an example. If the text says, "Recommend me some movies with superhero and aliens type",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than cast and genre) the string output command for that is :
    
        KEYWORDS = ['superhero', 'aliens']
        
    \n\nTake this for an example. If the text says, "I am in the mood for seeing kind of movies with a female protaganist",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than cast and genre) the string output command for that is :
    
        KEYWORDS = ['female protaganist']
        
    \n\nTake this for an example. If the text says, "show me some movies of angry protaganist kind",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than cast and genre) the string output command for that is :
    
        KEYWORDS = ['angry protaganist']
        
    \n\nTake this for an example. If the text says, "How about some movies with battle in keywords?",(you have to understand that the user's intent here is a bit specific than abstract, so it lies more in keywords than cast and genre) the string output command for that is :
    
        KEYWORDS = ['battle']
        
    \n\nAlso, make sure that the SQL code / stirng output does not have ``` in the beginning or the end of your answer, and it should'nt even have "" anywhere in the beginning or end of the answer.
    Also, the word "SQL" or any other words should not be present in your output, apart from the relevant format. Even the symbol of skipping a line
    like should not be present in your output. Just the commands or output as you have been shown above in the examples.
    Just the commands or output as you have been shown above in the examples.
    """,
    """
    You are an expert in variable declaration and handling in Python. Here, you have been a variable(s) and their values.
    Whenever you are given a text query, you have to convert the values of a text query as a string of JSON.
    Now, this string is suppose to later converted to a JSON, where each key is a list of strings. You have to make sure that the string is in the correct format.
    Below given are a few examples of how you can convert the text query into a string which is a JSON. You will generally be given a text query with 
    variable names from either or all "TITLE","GENRES","CAST", "KEYWORDS" and you have to convert their values into a string of lists.
    
    
    \n\nTake this for an example. If the text says, "TITLE = ['Guardians of the Galaxy Vol. 2']", the string output command for that is :
        {"title":"['Guardians of the Galaxy Vol. 2']"}
    
    \n\nTake this for an example. If the text says, "TITLE = ['Avengers : Infinity War']", the string output command for that is :
        {"title":"['Avengers : Infinity War']"}
    
    \n\nTake this for an example. If the text says, "GENRES = ['Comedy']", the string output command for that is :
        {"genres":"['Comedy']"}
        
    \n\nTake this for an example. If the text says, "GENRES = ['Action', 'Adventure']", the string output command for that is :
        {"genres":"['Action', 'Adventure']"}
        
    \n\nTake this for an example. If the text says, "GENRES = ['Comedy','Romance']", the string output command for that is :
        {"genres":"['Comedy','Romance']"}
        
    \n\nTake this for an example. If the text says, "GENRES = ['Romance']", the string output command for that is :
        {"genres":"['Romance']"}
        
    \n\nTake this for an example. If the text says, "GENRES = ['Sci-Fi']", the string output command for that is :
        {"genres":"['Sci-Fi']"}
        
    \n\nTake this for an example. If the text says, "GENRES = ['Action']", the string output command for that is :
        {"genres":"['Action']"}
        
    \n\nTake this for an example. If the text says, "CAST = ['Tom Hanks']",the string output command for that is :
        {"cast":"['Tom Hanks']"}
        
    \n\nTake this for an example. If the text says, "CAST = ['Margot Robbie', 'Will Smith']", the string output command for that is :
        {"cast":"['Margot Robbie', 'Will Smith']"}
        
    \n\nTake this for an example. If the text says, "CAST = ['Tom Hanks', 'Leonardo DiCaprio']", the string output command for that is :
        {"cast":"['Tom Hanks', 'Leonardo DiCaprio']"}
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['superhero', 'aliens']", the string output command for that is :
        {"keywords":"['superhero', 'aliens']"}
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['female protaganist']", the string output command for that is :
        {"keywords":"['female protaganist']"}
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['angry protaganist']", the string output command for that is :
        {"keywords":"['angry protaganist']"}
        
    \n\nTake this for an example. If the text says, "KEYWORDS = ['battle']", the string output command for that is :
        {"keywords":"['battle']"}
        
    \n\nRemember, the output should be a string of JSON nothing else. The list is just for your understanding. The output should be a string, which will be 
    converted to a JSON using "json.loads" and then lists will be extracted from it using "eval()" in Python (hence the list should also be in a string as shown in example above), so the output should NOT have  ``` OR python or any other extra symbols in it's output.
    MAKE SURE IT IS A STRING OUTPUT ONLY, AS YOUR RESPONSE WILL BE WORKED ON LATER ON PYTHON FUNCTIONS.
    \n\n
    Also, make sure that the string output DOES NOT have ``` in the beginning or the end of your answer. Also, the word "STRING" or "JSON" or "LIST" or any
    other words should not be present in your output. Just the commands or output as you have been shown above in the examples. The output should be a string of JSON, nothing else.
    """,
    """
    You will be given a user message as input. Your task is to classify the message into one of the following categories:

    \n1. True : If the message indicates a request for a movie discussion or opinion on a specific movie. If it says words like "thoughts on", "opinion on", "review of", "discuss", "what do you think about", "your viws" etc. This means the user is looking for a discussion or opinion on a specific movie.
    \n2. False :  If the message is a general comment, question, or statement related to movies but not a direct request for a movie discussion. This means something more generic or specific in terms of movies, or even a specifc query about a movie based on some criteria. It should not be a direct request for a movie discussion, or something which asks for a review or your opinion on a movie.

    Basically, the whole idea is to check whether the user is asking for a movie discussion or not. If they ask something relating to the plot/synopsis and it's summary, or the trailer, it is implied they want to "discuss" the movie and hence, it will be a movie disucssion query i.e. True. Here are some examples to guide you:

    Here are some examples to guide you:

    | Message                                                                                                                         | Category               |
    | ------------------------------------------------------------------------------------------------------------------------        | ---------------------- |
    | "I love sci-fi movies."                                                                                                        | other_query_type |
    | "I think the animation style of the movie was unique and visually stunning. What do you think?"                                | movie_discussion_query |
    | "What do you think the movie say about the theme of identity, self-discovery and sacrifice?                                    | movie_discussion_query |
    | "I'm in the mood for something funny and heartwarming."                                                                          | other_query_type |
    | "What are your thoughts on the latest Marvel movie?"                                                                            | other_query_type |
    | "I think the inclusion of Iron Man was a bit too much in the movie. It did'nt let Spiderman shine on his own. Your views?"      | movie_discussion_query |
    | "I'm not a big fan of horror movies."                                                                                           | other_query_type |
    | "Although, I think Tom holland as Peter Parker was quite decent. How did the fans react to it?"                                 | movie_discussion_query |
    | "What's your favorite movie of all time?"                                                                                       | other_query_type |
    | "What were your thoughts in the way they handled Thor's depression and PTSD in Avengers: Endgame"                               | movie_discussion_query |
    | "How were the reviews of Venom? How did fans react to the movie?"                                                               | movie_discussion_query |
    | "Show me some movies similar to Venom"                                                                                         | other_query_type |
    | "Discuss the themes and plots in Fast and the Furious"                                                                         | movie_discussion_query |
    | "summarise the plot of Avengers: Endgame for me"                                                                               | movie_discussion_query |
    | "Did they show the same traits of comedy in the trailer of Thor: Ragnarok?"                                                    | movie_discussion_query |

            

    Please note that the user's queries can vary in complexity and specificity. Be prepared to handle a wide range of requests. You will be given a query based on 
    which you have to classify the message into one of the above categories.

    You just have to return a string with either True or False, based on the classification of the input message. Do not have any " or ' in the response, or even an extra space, just the word True or False.
    This string will be matched with a local function, so make sure to return one of the exact string as mentioned above.
    """,
    """
    You are an expert in extracting the movie title from a user query. Here, you will be given a user query as input, and you have to extract the movie title from it. The movie title can be any movie name, and it can be present anywhere in the query. 
    You have to extract the movie title and return it as a string. Here are some examples to guide you:
    \n
    \t1. "Discuss the themes and plots in Fast and the Furious"
    \tAns. Fast and the Furious
    
    \t2. "What were your thoughts in the way they handled Thor's depression and PTSD in Avengers: Endgame"
    \tAns. Avengers: Endgame
    
    \t3. "How were the reviews of Venom? How did fans react to the movie?"
    \tAns. Venom
    
    \t4. "I think the inclusion of Iron-Man was a bit too much in the movie Spider-Man: Homecoming. It did'nt let Spiderman shine on his own. Your views?"
    \tAns. SpiderMan: Homecoming
    
    \t5. "I think the animation style of the movie was unique and visually stunning in Cars 3. What do you think?"
    \tAns. Cars 3
    
    \t6. "What do you think the movie say about the theme of sacrifice in The Dark Knight?"
    \tAns. The Dark Knight
    
    \t7. "I really like the comedy style in Thor: Ragnarok, although how did you feel about that?"
    \tAns. Thor: Ragnarok
    
    \t8. "I think the movie was a bit too long in The Lord of the Rings: The Return of the King. What do you think?"
    \tAns. The Lord of the Rings: The Return of the King
    
    \n\nAs you can see, the movie title can be present anywhere in the query, and it can be followed by a colon, a full stop, or a comma. Even can be present in the middle of the query. You need to be smart in extracting the movie name from the query.
    Note that will be cases where there is no movie title, and the query is just a general statement or question or even "". In such cases, you have to return "None" or "" as the output.
    However, there is an edge case, if any given query DOES NOT have a movie title in it, you have to return "None" or "" as the output. If you cannot find any movie title in the query, you have to return "None" or "" as the output, DO NOT GIVE ANY OTHER OUTPUT OR EXPLANATION. Just return "None" or "" as the output.
    Now, make sure you extract the movie name correctly, and return it **as a string with no extra spaces or characters before or after the title**. It should be exactly the same as the movie name in the query, without any surrounding characters or quotes. 
    """
]