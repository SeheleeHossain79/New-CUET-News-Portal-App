from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NewsCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = None
    is_featured: Optional[bool] = False

class NewsResponse(BaseModel):
    id: int
    title: str
    content: str
    summary: Optional[str]
    category: Optional[str]
    is_featured: bool
    created_at: datetime

    class Config:
        from_attributes = True
