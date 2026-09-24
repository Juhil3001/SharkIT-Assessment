from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.auth_service import validate_credentials

router = APIRouter()


class LoginBody(BaseModel):
    email: str | None = None
    password: str | None = None


@router.post("/login")
def login(body: LoginBody):
    email = (body.email or "").strip()
    password = body.password or ""
    if not email or not password.strip():
        raise HTTPException(status_code=400, detail="Email and password required")
    if not validate_credentials(email, password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"ok": True}
