from datetime import datetime
from typing import Optional, List
from beanie import Document, Link
from pydantic import Field

class User(Document):
    name: str
    email: str = Field(unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "users"

class Transaction(Document):
    user_id: str # Store as string ID for simplicity in linking, or could use Link[User]
    amount: float
    type: str # income / expense
    category: str
    description: Optional[str] = None
    date: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "transactions"

class Goal(Document):
    user_id: str
    name: str
    target_amount: float
    current_amount: float = 0.0
    deadline: Optional[datetime] = None
    completed: bool = False

    class Settings:
        name = "goals"

class Asset(Document):
    user_id: str
    name: str  # e.g., "House", "Car", "Stocks", "Savings Account", etc.
    type: str  # e.g., "real_estate", "vehicle", "investment", "cash", "other"
    current_value: float
    purchase_date: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    class Settings:
        name = "assets"
