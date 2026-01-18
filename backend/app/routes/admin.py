

# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from fastapi.security import OAuth2PasswordRequestForm
# from sqlalchemy import func

# from app.database import get_db
# from app.models.admin import Admin
# from app.models.news import News
# from app.schemas.admin import AdminCreate, AdminResponse
# from app.utils.security import hash_password, verify_password
# from app.utils.jwt import create_access_token
# from app.dependencies.admin_auth import get_current_admin
# from app.schemas.news import NewsUpdate
# from fastapi import Path
# from app import models


# router = APIRouter(prefix="/admin", tags=["Admin"])


# # ============================
# # CREATE ADMIN
# # ============================

# @router.post("/create", response_model=AdminResponse)
# def create_admin(
#     admin: AdminCreate,
#     db: Session = Depends(get_db)
# ):
#     existing = db.query(Admin).filter(Admin.email == admin.email).first()
#     if existing:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Admin already exists"
#         )

#     new_admin = Admin(
#         name=admin.name,
#         email=admin.email,
#         password_hash=hash_password(admin.password),
#     )

#     db.add(new_admin)
#     db.commit()
#     db.refresh(new_admin)

#     return new_admin


# # ============================
# # ADMIN LOGIN (OAuth2 FORM)
# # ============================

# @router.post("/login")
# def login_admin(
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db),
# ):
#     admin = db.query(Admin).filter(
#         Admin.email == form_data.username
#     ).first()

#     if not admin or not verify_password(
#         form_data.password,
#         admin.password_hash
#     ):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid credentials"
#         )

#     access_token = create_access_token(
#         data={"admin_id": admin.id}
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer",
#     }


# # ============================
# # ADMIN – GET ALL NEWS
# # (PROTECTED)
# # ============================

# @router.get("/news")
# def get_all_news_admin(
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     return (
#         db.query(News)
#         .order_by(News.created_at.desc())
#         .all()
#     )

# @router.delete("/news/{news_id}")
# def delete_news(
#     news_id: int,
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).filter(News.id == news_id).first()
#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     db.delete(news)
#     db.commit()
#     return {"message": "Deleted successfully"}

# @router.patch("/news/{news_id}/feature")
# def toggle_featured_news(
#     news_id: int,
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).filter(News.id == news_id).first()

#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     news.is_featured = not news.is_featured
#     db.commit()
#     db.refresh(news)

#     return {
#         "id": news.id,
#         "is_featured": news.is_featured,
#     }

# @router.put("/news/{news_id}")
# def update_news(
#     news_id: int,
#     data: NewsUpdate,
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).filter(News.id == news_id).first()

#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     # news.title = data.title
#     # news.category = data.category
#     # news.summary = data.summary

#     if data.title is not None:
#         news.title = data.title
#     if data.content is not None:
#         news.content = data.content
#     if data.category is not None:
#         news.category = data.category
#     if data.is_featured is not None:
#         news.is_featured = data.is_featured

#     db.commit()
#     db.refresh(news)

#     return news

# @router.get("/stats")
# def admin_stats(
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin)
# ):
#     total_news = db.query(News).count()
#     featured_news = db.query(News).filter(News.is_featured == True).count()

#     return {
#         "total_news": total_news,
#         "featured_news": featured_news,
#     }

# @router.patch("/news/{news_id}/feature")
# def toggle_featured_news(
#     news_id: int = Path(...),
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).filter(News.id == news_id).first()

#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     news.is_featured = not news.is_featured
#     db.commit()
#     db.refresh(news)

#     log_activity(
#     db=db,
#     admin=admin,
#     action="FEATURE_TOGGLE",
#     target_type="news",
#     target_id=news.id,
# )


#     return {
#         "id": news.id,
#         "is_featured": news.is_featured,
#         "message": "Featured status updated",
#     }
# # new
# @router.put("/{news_id}")
# def update_news(
#     news_id: int,
#     data: NewsUpdate,
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).get(news_id)
#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     news.title = data.title
#     news.content = data.content
#     news.category = data.category
#     news.is_featured = data.is_featured

#     db.commit()
#     log_activity(
#     db=db,
#     admin=admin,
#     action="UPDATE_NEWS",
#     target_type="news",
#     target_id=news.id,
# )


#     return news


# @router.delete("/{news_id}")
# def delete_news(
#     news_id: int,
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     news = db.query(News).get(news_id)
#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     db.delete(news)
#     db.commit()

#     log_activity(
#     db=db,
#     admin=admin,
#     action="DELETE_NEWS",
#     target_type="news",
#     target_id=news.id,
# )


#     return {"detail": "News deleted"}

# @router.get("/activity")
# def get_activity_log(
#     db: Session = Depends(get_db),
#     admin: Admin = Depends(get_current_admin),
# ):
#     return (
#         db.query(models.ActivityLog)
#         .order_by(models.ActivityLog.created_at.desc())
#         .limit(50)
#         .all()
#     )

from fastapi import APIRouter, Depends, HTTPException, status, Path
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func

from app.database import get_db
from app.models.admin import Admin
from app.models.news import News
from app.schemas.admin import AdminCreate, AdminResponse
from app.schemas.news import NewsUpdate
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.dependencies.admin_auth import get_current_admin
from app.utils.activity import log_activity
from app import models


router = APIRouter(prefix="/admin", tags=["Admin"])


# ============================
# CREATE ADMIN
# ============================
@router.post("/create", response_model=AdminResponse)
def create_admin(
    admin: AdminCreate,
    db: Session = Depends(get_db),
):
    existing = db.query(Admin).filter(Admin.email == admin.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin already exists",
        )

    new_admin = Admin(
        name=admin.name,
        email=admin.email,
        password_hash=hash_password(admin.password),
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return new_admin


# ============================
# ADMIN LOGIN (OAuth2)
# ============================
@router.post("/login")
def login_admin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    admin = db.query(Admin).filter(
        Admin.email == form_data.username
    ).first()

    if not admin or not verify_password(
        form_data.password, admin.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )

    access_token = create_access_token(
        data={"admin_id": admin.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


# ============================
# GET ALL NEWS (ADMIN)
# ============================
@router.get("/news")
def get_all_news_admin(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(News)
        .order_by(News.created_at.desc())
        .all()
    )


# ============================
# UPDATE NEWS
# ============================
@router.put("/news/{news_id}")
def update_news(
    news_id: int,
    data: NewsUpdate,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    news = db.query(News).filter(News.id == news_id).first()

    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    if data.title is not None:
        news.title = data.title
    if data.content is not None:
        news.content = data.content
    if data.category is not None:
        news.category = data.category
    if data.is_featured is not None:
        news.is_featured = data.is_featured

    db.commit()
    db.refresh(news)

    log_activity(
        db=db,
        admin=admin,
        action="UPDATE_NEWS",
        target_type="news",
        target_id=news.id,
    )

    return news


# ============================
# DELETE NEWS
# ============================
@router.delete("/news/{news_id}")
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    news = db.query(News).filter(News.id == news_id).first()

    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    db.delete(news)
    db.commit()

    log_activity(
        db=db,
        admin=admin,
        action="DELETE_NEWS",
        target_type="news",
        target_id=news.id,
    )

    return {"detail": "News deleted successfully"}


# ============================
# TOGGLE FEATURED
# ============================
@router.patch("/news/{news_id}/feature")
def toggle_featured_news(
    news_id: int = Path(...),
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    news = db.query(News).filter(News.id == news_id).first()

    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    news.is_featured = not news.is_featured
    db.commit()
    db.refresh(news)

    log_activity(
        db=db,
        admin=admin,
        action="FEATURE_TOGGLE",
        target_type="news",
        target_id=news.id,
    )

    return {
        "id": news.id,
        "is_featured": news.is_featured,
    }


# ============================
# ADMIN STATS
# ============================
@router.get("/stats")
def admin_stats(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    total_news = db.query(News).count()
    featured_news = (
        db.query(News)
        .filter(News.is_featured == True)
        .count()
    )

    return {
        "total_news": total_news,
        "featured_news": featured_news,
    }


# ============================
# ACTIVITY LOG
# ============================
@router.get("/activity")
def get_activity_log(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(models.ActivityLog)
        .order_by(models.ActivityLog.created_at.desc())
        .limit(50)
        .all()
    )
