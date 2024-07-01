# This file contains all the dependencies that are required for the project, spanning from the standard library to the third-party libraries.
import sys
import os
from dotenv import load_dotenv
from .exception import CustomException
from .logger import logging
load_dotenv()

import pandas as pd
import chromadb
import sqlite3

import google.generativeai as genai
GOOGLE_API_KEY_MOVIE_RECOMMENDER = os.getenv("GOOGLE_API_KEY_MOVIE_RECOMMENDER")
genai.configure(api_key=GOOGLE_API_KEY_MOVIE_RECOMMENDER)

from fastapi import FastAPI, Depends, HTTPException, status, Query,Body
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, Field
from typing import List, Union, Dict

import pytest
from fastapi.testclient import TestClient

