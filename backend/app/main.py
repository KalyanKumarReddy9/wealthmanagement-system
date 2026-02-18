from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .models import User, Transaction, Goal, Asset
from .routers import auth, transactions, goals, dashboard, assets
from contextlib import asynccontextmanager

# Lifespan event for DB initialization
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db([User, Transaction, Goal, Asset])
    yield
    # Shutdown (if needed)

app = FastAPI(title="Wealth Manager API", lifespan=lifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000", "http://localhost:8080", "http://127.0.0.1:8080", "*"] ,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(transactions.router)
app.include_router(goals.router)
app.include_router(dashboard.router)
app.include_router(assets.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Wealth Management API (MongoDB)"}

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "mongodb"}
