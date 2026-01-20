# # backend/app/routes/news.py
# from fastapi import (
#     APIRouter,
#     Depends,
#     UploadFile,
#     File,
#     Form,
#     HTTPException,
# )
# from sqlalchemy.orm import Session
# import uuid
# import os

# from app.database import get_db
# from app import models, schemas
# from app.ai.summarizer import generate_summary

# # 🔐 Admin auth
# from app.dependencies.admin_auth import get_current_admin
# from app.models.admin import Admin

# # 🧾 Activity logger
# from app.utils.activity import log_activity

# router = APIRouter()


# # =========================
# # CREATE NEWS (ADMIN ONLY)
# # =========================
# @router.post("/", response_model=schemas.NewsResponse)
# def create_news(
#     title: str = Form(...),
#     content: str = Form(...),
#     category: str = Form(...),
#     is_featured: bool = Form(False),
#     image: UploadFile = File(None),

#     admin: Admin = Depends(get_current_admin),
#     db: Session = Depends(get_db),
# ):
#     # 📸 IMAGE SAVE
#     image_path = None
#     if image:
#         os.makedirs("uploads/news_images", exist_ok=True)

#         filename = f"{uuid.uuid4()}_{image.filename}"
#         image_path = f"uploads/news_images/{filename}"

#         with open(image_path, "wb") as f:
#             f.write(image.file.read())

#     # 🧠 AI SUMMARY
#     summary = generate_summary(content)

#     # 📰 CREATE NEWS
#     new_news = models.News(
#         title=title,
#         content=content,
#         summary=summary,
#         category=category.strip(),
#         image=image_path,
#         is_featured=is_featured,
#     )

#     db.add(new_news)
#     db.commit()
#     db.refresh(new_news)

#     # 🧾 LOG ACTIVITY
#     log_activity(
#         db=db,
#         admin_id=admin.id,
#         action="CREATE_NEWS",
#         target_type="news",
#         target_id=new_news.id,
#     )

#     return new_news


# # =========================
# # GET ALL NEWS (PUBLIC)
# # =========================
# @router.get("/", response_model=list[schemas.NewsResponse])
# def get_all_news(db: Session = Depends(get_db)):
#     return (
#         db.query(models.News)
#         .order_by(models.News.created_at.desc())
#         .all()
#     )


# # =========================
# # GET SINGLE NEWS (PUBLIC)
# # =========================
# @router.get("/{news_id}", response_model=schemas.NewsResponse)
# def get_single_news(
#     news_id: int,
#     db: Session = Depends(get_db),
# ):
#     news = db.query(models.News).filter(models.News.id == news_id).first()

#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     return news

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import uuid, os

from app.database import get_db
from app import models, schemas
from app.ai.summarizer import generate_summary

from app.dependencies.admin_auth import get_current_admin
from app.models.admin import Admin
from app.utils.activity import log_activity

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# =========================
# CREATE NEWS (ADMIN ONLY)
# =========================
@router.post("/", response_model=schemas.NewsResponse)
def create_news(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    is_featured: bool = Form(False),
    image: UploadFile | None = File(None),
    admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    summary = generate_summary(content)

    image_path = None
    if image:
        ext = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        image_path = f"{UPLOAD_DIR}/{filename}"

        with open(image_path, "wb") as f:
            f.write(image.file.read())

    new_news = models.News(
        title=title,
        content=content,
        summary=summary,
        category=category.strip(),
        image=image_path,
        is_featured=is_featured,
    )

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    log_activity(
        db=db,
        admin=admin,
        action="CREATE_NEWS",
        target_type="news",
        target_id=new_news.id,
    )

    return new_news


# =========================
# GET ALL NEWS (PUBLIC)
# =========================
@router.get("/", response_model=list[schemas.NewsResponse])
def get_all_news(db: Session = Depends(get_db)):
    return db.query(models.News).order_by(models.News.created_at.desc()).all()


# =========================
# GET SINGLE NEWS
# =========================
@router.get("/{news_id}", response_model=schemas.NewsResponse)
def get_single_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news
