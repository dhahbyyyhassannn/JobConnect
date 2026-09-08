from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, DateTime, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base

if TYPE_CHECKING:
    from .User import User
    from .Applications import Application
    from .JobCategory import JobCategory
    from .MatchResult import MatchResult
    from .JobRequirement import JobRequirement
    from .Bookmark import Bookmark

class JobOffer(Base):
    __tablename__ = "job_offers"
    job_offer_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    recruiter_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_category_id: Mapped[int] = mapped_column(
        ForeignKey("job_categories.job_category_id", ondelete="RESTRICT"), nullable=False, index=True
    )
    job_category: Mapped[str] = mapped_column(String(255), nullable=False)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    location: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[DateTime] = mapped_column(DateTime,
    server_default=func.now(),
    nullable=False)
    recruiter: Mapped["User"] = relationship("User", back_populates="job_offers")
    category: Mapped["JobCategory"] = relationship("JobCategory", back_populates="job_offers")
    requirements: Mapped[list["JobRequirement"]] = relationship(
        "JobRequirement", back_populates="job_offer", cascade="all, delete-orphan", passive_deletes=True
    )
    match_results: Mapped[list["MatchResult"]] = relationship(
        "MatchResult", back_populates="job_offer", cascade="all, delete-orphan", passive_deletes=True
    )
    bookmarks: Mapped[list["Bookmark"]] = relationship(
        "Bookmark", back_populates="job_offer", cascade="all, delete-orphan", passive_deletes=True
    )
    applications: Mapped[list["Application"]] = relationship(
        "Application", back_populates="job_offer", cascade="all, delete-orphan", passive_deletes=True
    )
