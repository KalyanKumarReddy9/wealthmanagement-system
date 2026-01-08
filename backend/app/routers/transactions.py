from fastapi import APIRouter, Depends
from typing import List
from .. import crud, schemas, models
from .auth import get_current_user

router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Transaction)
async def create_transaction(
    transaction: schemas.TransactionCreate,
    current_user: models.User = Depends(get_current_user)
):
    return await crud.create_user_transaction(transaction=transaction, user_id=str(current_user.id))

@router.get("/", response_model=List[schemas.Transaction])
async def read_transactions(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_user)
):
    return await crud.get_transactions(user_id=str(current_user.id), skip=skip, limit=limit)
