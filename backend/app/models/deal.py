from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, Enum, Float, Identity, Integer, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class Deal(Base):
    __tablename__ = "deals"
    __table_args__ = (
        CheckConstraint("char_length(pitch) <= 120", name="ck_deals_pitch_len"),
        CheckConstraint("amount >= 1000", name="ck_deals_amount_min"),
        CheckConstraint(
            "(\"type\" <> 'equity') OR (equity_pct IS NOT NULL)",
            name="ck_deals_equity_pct_required",
        ),
    )

    id: Mapped[int] = mapped_column(Integer, Identity(), primary_key=True)
    company: Mapped[str] = mapped_column(Text, nullable=False)
    founder: Mapped[str] = mapped_column(Text, nullable=False)
    sector: Mapped[str] = mapped_column(Text, nullable=False)
    pitch: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(
        Enum("equity", "loan", "grant", name="funding_type"),
        nullable=False,
    )
    amount: Mapped[int] = mapped_column(Integer, nullable=False)
    equity_pct: Mapped[float | None] = mapped_column(Float, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=func.now(),
    )
