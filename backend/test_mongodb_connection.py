import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.database import MONGO_URL, DATABASE_NAME

async def test_connection():
    try:
        print("🔄 Testing MongoDB Atlas Connection...")
        print(f"Connection String: mongodb+srv://iamavinash1947_db_user:***@cluster0.9kwmf6r.mongodb.net/")
        
        client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        
        # Try to perform a simple operation
        admin_db = client.admin
        await admin_db.command('ping')
        
        print("✓ MongoDB Connection Successful!")
        print(f"✓ Database: {DATABASE_NAME}")
        print("✓ Your Atlas cluster is reachable")
        
        return True
    except Exception as e:
        print(f"✗ Connection Failed: {str(e)[:100]}")
        print("\nPossible Issues:")
        print("1. Check if credentials are correct")
        print("2. Verify IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 or your IP)")
        print("3. Check internet connection")
        return False

if __name__ == "__main__":
    asyncio.run(test_connection())
