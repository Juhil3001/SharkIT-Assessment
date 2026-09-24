from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.deal import Deal
from app.schemas.deal_schema import DealCreate

VALID_TYPES = {"equity", "loan", "grant"}


def get_deals(db: Session, type_filter: str | None = None) -> list[Deal]:
    if type_filter is not None and type_filter not in VALID_TYPES:
        raise ValueError("Invalid type filter")

    query = select(Deal).order_by(Deal.id)
    if type_filter is not None:
        query = query.where(Deal.type == type_filter)
    return list(db.scalars(query).all())


def create_deal(db: Session, data: DealCreate) -> Deal:
    deal = Deal(
        company=data.company,
        founder=data.founder,
        sector=data.sector,
        pitch=data.pitch,
        type=data.type,
        amount=data.amount,
        equity_pct=data.equity_pct,
    )
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal
