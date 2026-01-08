from fastapi import APIRouter, Depends
from typing import List
from .. import crud, schemas, models
from .auth import get_current_user

router = APIRouter(
    prefix="/goals",
    tags=["Goals"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Goal)
async def create_goal(
    goal: schemas.GoalCreate,
    current_user: models.User = Depends(get_current_user)
):
    return await crud.create_user_goal(goal=goal, user_id=str(current_user.id))

@router.get("/", response_model=List[schemas.Goal])
async def read_goals(
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(get_current_user)
):
    return await crud.get_goals(user_id=str(current_user.id), skip=skip, limit=limit)
