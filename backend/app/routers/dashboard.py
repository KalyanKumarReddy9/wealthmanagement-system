from fastapi import APIRouter, Depends
from .. import crud, models, schemas
from .auth import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
    responses={404: {"description": "Not found"}},
)

@router.get("/summary")
async def get_dashboard_summary(current_user: models.User = Depends(get_current_user)):
    transactions = await crud.get_transactions(user_id=str(current_user.id), limit=1000)
    
    total_income = sum(t.amount for t in transactions if t.type == 'income')
    total_expenses = sum(t.amount for t in transactions if t.type == 'expense')
    net_worth = total_income - total_expenses # Simplified logic for now

    # Group by category for charts
    category_expenses = {}
    for t in transactions:
        if t.type == 'expense':
            category_expenses[t.category] = category_expenses.get(t.category, 0) + t.amount

    return {
        "net_worth": net_worth,
        "monthly_income": total_income, # Assuming all fetched are "current" for simplicity
        "monthly_expenses": total_expenses,
        "category_expenses": [{"name": k, "value": v} for k, v in category_expenses.items()]
    }
