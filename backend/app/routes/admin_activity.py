from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.admin_auth import get_current_admin
from app.models.admin import Admin
from app import models
from app.models.activity import ActivityLog

router = APIRouter(prefix="/admin/activity", tags=["Admin Activity"])


@router.get("/")
def get_recent_activity(
    db: Session = Depends(get_db),
    admin: Admin = Depends(get_current_admin),
):
    logs = (
        db.query(ActivityLog)
        .order_by(ActivityLog.created_at.desc())
        .limit(20)
        .all()
    )

    return [
        {
            "id": log.id,
            "action": log.action,
            "target_type": log.target_type,
            "target_id": log.target_id,
            "admin_name": log.admin.name,
            "admin_email": log.admin.email,
            "created_at": log.created_at,
        }
        for log in logs
    ]
