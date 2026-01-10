from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.ai.summarizer import generate_summary

# 🔐 admin auth dependency
from app.dependencies.admin_auth import get_current_admin
from app.models.admin import Admin

router = APIRouter()


# =========================
# CREATE NEWS (ADMIN ONLY)
# =========================
@router.post("/", response_model=schemas.NewsResponse)
def create_news(
    news: schemas.NewsCreate,
    admin: Admin = Depends(get_current_admin),  # 🔐 protected
    db: Session = Depends(get_db),
):
    summary = generate_summary(news.content)

    new_news = models.News(
        title=news.title,
        content=news.content,
        summary=summary,
        category=news.category,
        is_featured=news.is_featured,
    )

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    return new_news


# =========================
# GET ALL NEWS (PUBLIC)
# =========================
@router.get("/", response_model=list[schemas.NewsResponse])
def get_all_news(db: Session = Depends(get_db)):
    return (
        db.query(models.News)
        .order_by(models.News.created_at.desc())
        .all()
    )
