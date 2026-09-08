from enum import Enum

from sqlalchemy import CheckConstraint, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING

from cv_intelligent.database import Base

class UserRole(str, Enum):
    USER = "user"
    RECRUITER = "recruiter"
    ADMIN = "admin"


if TYPE_CHECKING:
    from .CV import CV
    from .Applications import Application
    from .JobOffer import JobOffer
    from .Bookmark import Bookmark
class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint(
            "role IN ('user', 'recruiter', 'admin')", name="ck_users_valid_role"
        ),
    )

    user_id : Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(255), unique=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password : Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(
        String(20), nullable=False, default=UserRole.USER, server_default=UserRole.USER.value
    )
    cvs: Mapped[list["CV"]] = relationship(
        "CV", back_populates="user", cascade="all, delete-orphan", passive_deletes=True
    )
    applications: Mapped[list["Application"]] = relationship(
        "Application", back_populates="user", cascade="all, delete-orphan", passive_deletes=True
    )
    job_offers: Mapped[list["JobOffer"]] = relationship(
        "JobOffer", back_populates="recruiter", passive_deletes=True
    )
    bookmarks: Mapped[list["Bookmark"]] = relationship(
        "Bookmark", back_populates="user", cascade="all, delete-orphan", passive_deletes=True
    )
