from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

MONGO_URL = os.getenv('MONGO_URI') or os.getenv('MONGO_URL')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'wealth_db')

async def init_db(document_models: List):
    if not MONGO_URL:
        raise RuntimeError('MONGO_URI is not set in environment')
    client = AsyncIOMotorClient(MONGO_URL)
    await init_beanie(database=client[DATABASE_NAME], document_models=document_models)
