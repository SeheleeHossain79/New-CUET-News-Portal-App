from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NewsBase(BaseModel):
    title: str
    content: str
    category: str
    is_featured: bool = False

class NewsCreate(NewsBase):
    pass

class NewsResponse(NewsBase):
    id: int
    summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
