from fastapi import FastAPI
from app.database import engine, Base

# 🔥 IMPORTANT: models import (table creation er jonno)
from app import models  

from app.routes import news, admin

app = FastAPI(
    title="CUET News Portal API",
    description="Backend API for CUET News Portal with AI summary and admin authentication",
    version="1.0.0",
)

# Create database tables (news + admins)
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(news.router, prefix="/news", tags=["News"])
app.include_router(admin.router, tags=["Admin"])

@app.get("/")
def root():
    return {"message": "CUET News Portal backend running"}
