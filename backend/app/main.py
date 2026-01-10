# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "CUET News Portal backend running"}


# from fastapi import FastAPI
# from app.database import engine
# from sqlalchemy import text

# app = FastAPI()

# @app.get("/")
# def root():
#     with engine.connect() as conn:
#         result = conn.execute(text("SELECT 1"))
#     return {"message": "Database connected successfully"}

# from fastapi import FastAPI
# from app.database import engine
# from app import models

# app = FastAPI()

# # 👇 This line creates tables
# models.Base.metadata.create_all(bind=engine)

# @app.get("/")
# def root():
#     return {"message": "CUET News Portal backend running with DB"}

from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import news

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(news.router, prefix="/news", tags=["News"])

@app.get("/")
def root():
    return {"message": "CUET News Portal backend running"}

