
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import os
import inspect
from dotenv import load_dotenv
import google.generativeai as genai 
from api.vaccines import router as vaccines_router
from api.emergency import router as emergency_router
from api.avoid import router as avoid_router
from api.avoidance import router as avoidance_router


load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()


# Allow requests from react
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # for now use localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vaccines_router)
app.include_router(emergency_router)
app.include_router(avoid_router)
app.include_router(avoidance_router)


@app.post("/api/chat")
def chat(user_message: str = Body(..., media_type="text/plain")):
    extraInfo = " Please answer in plain text only, max word count is 100. Without any Markdown formatting or special characters. Also this conversation topic is about "
    response = model.generate_content(user_message + extraInfo)
    return {"response": response.text}
