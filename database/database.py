from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from typing import List

# MongoDB Connection Details
# Replace with actual credentials in production or env vars
MONGO_URL = "mongodb://localhost:27017"
DATABASE_NAME = "wealth_db"

async def init_db(document_models: List):
    client = AsyncIOMotorClient(MONGO_URL)
    await init_beanie(database=client[DATABASE_NAME], document_models=document_models)
