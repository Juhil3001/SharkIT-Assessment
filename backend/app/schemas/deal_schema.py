from datetime import datetime
from typing import Literal, Self

from pydantic import BaseModel, ConfigDict, Field, field_serializer, model_validator


class DealCreate(BaseModel):
    company: str = Field(..., min_length=1, max_length=100)
    founder: str = Field(..., min_length=1, max_length=100)
    sector: str = Field(..., min_length=1, max_length=80)
    pitch: str = Field(..., min_length=1, max_length=120)
    type: Literal["equity", "loan", "grant"]
    amount: int = Field(..., ge=1000)
    equity_pct: float | None = Field(None, ge=0, le=100)

    @model_validator(mode="after")
    def equity_pct_required_for_equity(self) -> Self:
        if self.type == "equity" and self.equity_pct is None:
            raise ValueError("equity_pct is required for equity deals")
        return self


class DealResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    company: str
    founder: str
    sector: str
    pitch: str
    type: Literal["equity", "loan", "grant"]
    amount: int
    equity_pct: float | None
    created_at: datetime

    @field_serializer("created_at")
    def format_created_at(self, value: datetime) -> str:
        return value.isoformat()
