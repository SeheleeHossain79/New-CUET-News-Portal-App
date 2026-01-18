# from sqlalchemy.orm import Session
# from app.models.activity import ActivityLog

# def log_activity(
#     db: Session,
#     admin_id: int,
#     action: str,
#     target_type: str,
#     target_id: int,
# ):
#     activity = ActivityLog(
#         admin_id=admin_id,
#         action=action,
#         target_type=target_type,
#         target_id=target_id,
#     )

#     db.add(activity)
#     db.commit()

# from sqlalchemy.orm import Session
# from app.models.activity import ActivityLog
# from app.models.admin import Admin


# def log_activity(
#     db: Session,
#     admin: Admin,                 # ✅ full admin object
#     action: str,
#     target_type: str,
#     target_id: int | None = None,
# ):
#     activity = ActivityLog(
#         admin_id=admin.id,
#         admin_name=admin.name,     # ✅ THIS FIXES NAME ISSUE
#         action=action,
#         target_type=target_type,
#         target_id=target_id,
#     )

#     db.add(activity)
#     db.commit()

from sqlalchemy.orm import Session
from app.models.activity import ActivityLog
from app.models.admin import Admin


def log_activity(
    db: Session,
    admin: Admin,
    action: str,
    target_type: str,
    target_id: int | None = None,
):
    activity = ActivityLog(
        admin_id=admin.id,
        action=action,
        target_type=target_type,
        target_id=target_id,
    )

    db.add(activity)
    db.commit()
