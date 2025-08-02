from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.vaccines import router as vaccines_router


app = FastAPI()

# Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vaccines_router)

