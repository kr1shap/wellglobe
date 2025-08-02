from fastapi import FastAPI, Query
import requests
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow frontend (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

google_api = os.getenv("GOOGLE_API_KEY")

@app.get("/nearby-hospitals")
def get_nearby_hospitals(lat: float = Query(...), lng: float = Query(...), radius: int = 20000):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": "health",
        "key": google_api,
    }
    response = requests.get(url, params=params)
    return response.json()
