from fastapi import APIRouter, Depends
from .. import crud, models, schemas
from .auth import get_current_user
from datetime import datetime, timedelta
from collections import defaultdict

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
    responses={404: {"description": "Not found"}},
)


def month_label(dt: datetime) -> str:
    return dt.strftime('%b')


@router.get("/summary")
async def get_dashboard_summary(current_user: models.User = Depends(get_current_user)):
    # Fetch a large set of transactions for aggregation
    transactions = await crud.get_transactions(user_id=str(current_user.id), limit=10000)

    # Totals
    total_income = sum(t.amount for t in transactions if t.type == 'income')
    total_expenses = sum(t.amount for t in transactions if t.type == 'expense')
    net_worth = total_income - total_expenses

    # Category expenses
    category_expenses = {}
    for t in transactions:
        if t.type == 'expense':
            category_expenses[t.category] = category_expenses.get(t.category, 0) + t.amount

    # Monthly series for last 6 months
    now = datetime.utcnow()
    months = []
    for i in range(5, -1, -1):
        m = (now.replace(day=1) - timedelta(days=now.day-1)) - timedelta(days=30*i)
        months.append(m.replace(day=1))

    monthly_net_change = defaultdict(float)
    for t in transactions:
        td = t.date
        # normalize to first of month
        key = datetime(td.year, td.month, 1)
        if t.type == 'income':
            monthly_net_change[key] += t.amount
        else:
            monthly_net_change[key] -= t.amount

    # Build cumulative net worth series
    series = []
    cumulative = 0.0
    for m in months:
        cumulative += monthly_net_change.get(m, 0.0)
        series.append({"name": month_label(m), "value": round(cumulative, 2)})

    return {
        "net_worth": round(net_worth, 2),
        "monthly_income": round(total_income, 2),
        "monthly_expenses": round(total_expenses, 2),
        "category_expenses": [{"name": k, "value": v} for k, v in category_expenses.items()],
        "monthly_series": series,
        "user_name": current_user.name
    }
