from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.database import get_db
from app.models.admin import Admin
from app.schemas.admin import AdminCreate, AdminLogin, AdminResponse
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.post("/create", response_model=AdminResponse)
def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existing = db.query(Admin).filter(Admin.email == admin.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")

    new_admin = Admin(
        name=admin.name,
        email=admin.email,
        password_hash=hash_password(admin.password),
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return new_admin


# @router.post("/login")
# def login_admin(credentials: AdminLogin, db: Session = Depends(get_db)):
#     admin = db.query(Admin).filter(Admin.email == credentials.email).first()

#     if not admin or not verify_password(credentials.password, admin.password_hash):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     # 🔐 IMPORTANT: admin_id must be inside token
#     access_token = create_access_token(
#         data={"admin_id": admin.id}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer",
#     }

@router.post("/login")
def login_admin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()

    if not admin or not verify_password(form_data.password, admin.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"admin_id": admin.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }