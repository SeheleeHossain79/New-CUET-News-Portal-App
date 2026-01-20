# from pydantic import BaseModel
# from datetime import datetime
# from typing import Optional

# class NewsBase(BaseModel):
#     title: str
#     content: str
#     category: str
#     is_featured: bool = False

# class NewsCreate(NewsBase):
#     pass

# class NewsResponse(NewsBase):
#     id: int
#     summary: Optional[str]
#     created_at: datetime

#     class Config:
#         from_attributes = True

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ============================
# BASE MODEL (shared fields)
# ============================

class NewsBase(BaseModel):
    title: str
    content: str
    summary: str
    category: str
    is_featured: bool = False
    image: Optional[str] = None


# ============================
# CREATE NEWS (Admin add)
# ============================

class NewsCreate(NewsBase):
    pass


# ============================
# UPDATE NEWS (Admin edit)
# ============================

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    is_featured: Optional[bool] = None


# ============================
# RESPONSE MODEL
# ============================

class NewsResponse(NewsBase):
    id: int
    summary: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True   # Pydantic v2 compatible
