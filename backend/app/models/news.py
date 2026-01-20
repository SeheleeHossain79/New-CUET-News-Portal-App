from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from app.database import Base

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    category = Column(String, nullable=False)
    image = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
