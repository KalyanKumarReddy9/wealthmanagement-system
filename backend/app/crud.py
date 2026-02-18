from . import models, schemas, auth_utils
from beanie import PydanticObjectId

# User CRUD
async def get_user(user_id: str):
    return await models.User.get(PydanticObjectId(user_id))

async def get_user_by_email(email: str):
    return await models.User.find_one(models.User.email == email)

async def create_user(user: schemas.UserCreate):
    hashed_password = auth_utils.get_password_hash(user.password)
    db_user = models.User(email=user.email, name=user.name, hashed_password=hashed_password)
    await db_user.insert()
    # Return a Pydantic-friendly dict (convert ObjectId to str for 'id')
    return {
        "id": str(db_user.id),
        "email": db_user.email,
        "name": db_user.name,
        "created_at": db_user.created_at,
    }

# Transaction CRUD
async def get_transactions(user_id: str, skip: int = 0, limit: int = 100):
    return await models.Transaction.find(models.Transaction.user_id == str(user_id)).skip(skip).limit(limit).to_list()

async def create_user_transaction(transaction: schemas.TransactionCreate, user_id: str):
    db_transaction = models.Transaction(**transaction.dict(), user_id=str(user_id))
    await db_transaction.insert()
    return db_transaction

# Goal CRUD
async def get_goals(user_id: str, skip: int = 0, limit: int = 100):
    return await models.Goal.find(models.Goal.user_id == str(user_id)).skip(skip).limit(limit).to_list()

async def create_user_goal(goal: schemas.GoalCreate, user_id: str):
    db_goal = models.Goal(**goal.dict(), user_id=str(user_id))
    await db_goal.insert()
    return db_goal

# Asset CRUD
async def get_assets(user_id: str, skip: int = 0, limit: int = 100):
    return await models.Asset.find(models.Asset.user_id == str(user_id)).skip(skip).limit(limit).to_list()

async def create_user_asset(asset: schemas.AssetCreate, user_id: str):
    db_asset = models.Asset(**asset.dict(), user_id=str(user_id))
    await db_asset.insert()
    return db_asset

async def get_total_assets_value(user_id: str):
    assets = await models.Asset.find(models.Asset.user_id == str(user_id)).to_list()
    return sum(asset.current_value for asset in assets)
