from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Connection Details
MONGO_URL = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'wealth_db')

async def init_db(document_models: List):
    client = AsyncIOMotorClient(MONGO_URL)
    await init_beanie(database=client[DATABASE_NAME], document_models=document_models)
