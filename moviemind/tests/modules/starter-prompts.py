import pytest
import httpx
import os
import asyncio


BASE_URL = "http://localhost:8080/api/chat"  

generic_test_prompts = [
    {"question": "Hi chitra!"},
    {"question": "Hello chitra"},
    {"question": "Tell me about yourself."},
    {"question": "so what do you do?"},
    {"question": "I really like action movies, with a dash of comedy in them"},
    {"question": "I'm a big fan of horror movies"},
    {"question": "Hmm I don't know what to watch"},
    {"question": "So you see, I really like romantic thrillers"},
    {"question": "Big ensemble casts in superhero genre are my thing"},
    {"question": "I'm in the mood for a good drama movie"}
]

current_filename = os.path.splitext(os.path.basename(__file__))[0]
log_file_path = f"../results/{current_filename}_results.txt"

@pytest.fixture(scope="session", autouse=True)
def clear_log_file():
    """Clears the log file before any tests run."""
    with open(log_file_path, "w") as f:
        f.write("Test Results:\n")
        f.write("=" * 40 + "\n")
        
        
@pytest.mark.asyncio
@pytest.mark.parametrize("test_prompt", generic_test_prompts)
async def test_generic_chat_responses(test_prompt):
    
    retries = 3 
    delay_between_attempts = 5  

    for attempt in range(retries):
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(BASE_URL, json=test_prompt)
                
            assert response.status_code == 200, f"Unexpected status code: {response.status_code}"
            json_data = response.json()
            assert "type" in json_data and json_data["type"] == "text", "Response type is not 'text'."
            assert "data" in json_data and len(json_data["data"].strip()) > 0, "Response text is empty or missing."

            with open(log_file_path, "a") as log_file:
                log_file.write(f"Prompt: {test_prompt['question']}\n")
                log_file.write(f"Response: {json_data['data']}\n")
                log_file.write("-" * 40 + "\n")
            
            
            await asyncio.sleep(10)
            break 
            
        except Exception as e:
            if attempt < retries - 1:
                await asyncio.sleep(delay_between_attempts)
            else:
                assert False, f"Test failed after {retries} attempts with exception: {str(e)}"
