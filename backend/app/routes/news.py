# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session

# from app.database import get_db
# from app import models, schemas
# from app.ai.summarizer import generate_summary

# # 🔐 admin auth dependency
# from app.dependencies.admin_auth import get_current_admin
# from app.models.admin import Admin

# from app.utils.activity import log_activity


# router = APIRouter()


# # =========================
# # CREATE NEWS (ADMIN ONLY)
# # =========================
# @router.post("/", response_model=schemas.NewsResponse)
# def create_news(
#     news: schemas.NewsCreate,
#     admin: Admin = Depends(get_current_admin),  # 🔐 protected
#     db: Session = Depends(get_db),
# ):
#     summary = generate_summary(news.content)

#     new_news = models.News(
#         title=news.title,
#         content=news.content,
#         summary=summary,
#         category=news.category,
#         is_featured=news.is_featured,
#     )

#     db.add(new_news)
#     db.commit()
#     db.refresh(new_news)

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

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.ai.summarizer import generate_summary

# 🔐 Admin auth
from app.dependencies.admin_auth import get_current_admin
from app.models.admin import Admin

# 🧾 Activity logger
from app.utils.activity import log_activity

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
        category=news.category.strip(),

        is_featured=news.is_featured,
    )

    db.add(new_news)
    db.commit()
    db.refresh(new_news)

    # 🧾 LOG ACTIVITY
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
    return (
        db.query(models.News)
        .order_by(models.News.created_at.desc())
        .all()
    )

@router.get("/{news_id}", response_model=schemas.NewsResponse)
def get_single_news(
    news_id: int,
    db: Session = Depends(get_db)
):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news
