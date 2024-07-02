#Importing all the dependencies
from src.dependencies import *

# Defining the Chitra class
class Chitra:
    """
    A class to represent the Chitra Movie Bot. This class is responsible for handling the interactions with the GenerativeAI model.
    Attributes:
    1. model_name : str
        The name of the model to be used.
    2. generation_config : dict
        The generation configuration for the model.
    3. safety_settings : dict
        The safety settings for the model.
    4. system_instruction : str
        The system instruction for the model.
    """
    
    def __init__(self, model_name, generation_config, safety_settings, system_instruction):
        self.model = genai.GenerativeModel(
            model_name=model_name,
            generation_config=generation_config,
            safety_settings=safety_settings,
            system_instruction=system_instruction
        )
        self.chat_session = self.model.start_chat()

    def send_message(self, message):
        """
        A method to send a message to the GenerativeAI model.
        
        Parameters:
        1. message : str
            The message to be sent to the model.
            
        Returns:
        The response from the Gemini model.
        """
        return self.chat_session.send_message(message)