from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.vaccines import router as vaccines_router
from api.emergency import router as emergency_router
from api.avoid import router as avoid_router


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


