from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True

# Transaction
class TransactionBase(BaseModel):
    amount: float
    type: str # income / expense
    category: str
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: str
    user_id: str
    date: datetime

    class Config:
        orm_mode = True

# Goal
class GoalBase(BaseModel):
    name: str
    target_amount: float
    current_amount: float = 0.0
    deadline: Optional[datetime] = None
    completed: bool = False

class GoalCreate(GoalBase):
    pass

class Goal(GoalBase):
    id: str
    user_id: str

    class Config:
        orm_mode = True

# Asset
class AssetBase(BaseModel):
    name: str
    type: str
    current_value: float
    purchase_date: Optional[datetime] = None
    notes: Optional[str] = None

class AssetCreate(AssetBase):
    pass

class Asset(AssetBase):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        orm_mode = True
