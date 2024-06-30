# Importing the dependencies
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

import pandas as pd
import sqlite3
import chromadb
from datetime import datetime
import json, os

# Importing the chromadb database
keyword_data_path = "../Chroma_Database"
client_key = chromadb.PersistentClient(path = keyword_data_path)
movie_collection = client_key.get_collection("Movies")

# Importing the SQL database
database = "../SQL_Database/Movies.db"
database_key_based = pd.read_sql_query("SELECT m.* FROM Movies_Key_Based AS m", sqlite3.connect(database))
database_query_based = pd.read_sql_query("SELECT m.* FROM Movies_Database AS m", sqlite3.connect(database))

# Initialising the API from FastAPI
app = FastAPI(prefix="/api")

