# from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from sqlalchemy.sql import func

# from app.database import Base

# class ActivityLog(Base):
#     __tablename__ = "activity_logs"

#     id = Column(Integer, primary_key=True, index=True)

#     admin_id = Column(Integer, ForeignKey("admins.id"), nullable=False)
#     admin = relationship("Admin")
#     action = Column(String, nullable=False)  
#     # e.g. "CREATE_NEWS", "UPDATE_NEWS", "DELETE_NEWS", "FEATURE_TOGGLE"

#     target_type = Column(String, nullable=False)
#     # e.g. "news"

#     target_id = Column(Integer, nullable=False)

#     created_at = Column(DateTime, default=datetime.utcnow)

    
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)

    admin_id = Column(Integer, ForeignKey("admins.id"), nullable=False)
    admin = relationship("Admin")  # 🔥 IMPORTANT

    action = Column(String, nullable=False)
    target_type = Column(String, nullable=False)
    target_id = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
