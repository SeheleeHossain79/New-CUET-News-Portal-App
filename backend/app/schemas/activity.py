from pydantic import BaseModel
from datetime import datetime

class ActivityResponse(BaseModel):
    id: int
    admin_id: int
    action: str
    target_type: str
    target_id: int | None
    created_at: datetime

    class Config:
        from_attributes = True
