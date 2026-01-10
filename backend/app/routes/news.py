from app.ai.summarizer import generate_summary

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter()

# @router.post("/", response_model=schemas.NewsResponse)
# def create_news(news: schemas.NewsCreate, db: Session = Depends(get_db)):
#     new_news = models.News(
#         title=news.title,
#         content=news.content,
#         category=news.category,
#         is_featured=news.is_featured
#     )

#     db.add(new_news)
#     db.commit()
#     db.refresh(new_news)

#     return new_news

@router.post("/", response_model=schemas.NewsResponse)
def create_news(news: schemas.NewsCreate, db: Session = Depends(get_db)):
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


@router.get("/", response_model=list[schemas.NewsResponse])
def get_all_news(db: Session = Depends(get_db)):
    return db.query(models.News).order_by(models.News.created_at.desc()).all()

