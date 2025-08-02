from fastapi import APIRouter, HTTPException
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re

router = APIRouter()
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@router.get("/advisory/{country}")
async def get_avoidance_level(country: str):
    prompt = f"""
    You are a travel safety assistant.

    Given the name of a country, generate a concise and structured travel advisory in JSON format using the following schema:

    {{
    "country": "{country}",
    "danger_level": "<One of: Take normal security precautions | Exercise a high degree of caution | Avoid non-essential travel | Avoid all travel>",
    "danger_number": an integer from 0 to 3, where the scale is affiliated with 'danger_level' above,
    "summary": "<1 sentence summary of the primary safety concern or reason for advisory>"
    }}

    Only return the JSON object.

    Use current geopolitical, environmental, and health-related conditions to make the assessment. Be brief, factual, and avoid speculation.

    Country: {country}
    """
    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # Remove markdown triple backticks and 'json' if present
        clean_text = re.sub(r"^```json\s*|```$", "", raw_text, flags=re.DOTALL).strip()

        try:
            advisory_data = json.loads(clean_text)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail=f"Invalid JSON from Gemini: {clean_text[:200]}")
        
        return advisory_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
