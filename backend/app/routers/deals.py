from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.deal_schema import DealCreate, DealResponse
from app.services.deal_service import create_deal, get_deals

router = APIRouter()


@router.get("/deals")
def list_deals(type: str | None = None, db: Session = Depends(get_db)):
    try:
        deals = get_deals(db, type)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid type filter") from None
    return {"deals": [DealResponse.model_validate(deal) for deal in deals]}


@router.post("/deals", status_code=201)
def post_deal(data: DealCreate, db: Session = Depends(get_db)):
    deal = create_deal(db, data)
    return {"deal": DealResponse.model_validate(deal)}
