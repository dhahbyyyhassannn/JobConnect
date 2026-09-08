from cv_intelligent.database import Base
from sqlalchemy import DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import TYPE_CHECKING


class Bookmark(Base):
    __tablename__ = "bookmarks"
    __table_args__ = (
        UniqueConstraint("user_id", "job_offer_id", name="uq_bookmarks_user_job_offer"),
    )

    bookmark_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_offer_id: Mapped[int] = mapped_column(
        ForeignKey("job_offers.job_offer_id", ondelete="CASCADE"), nullable=False, index=True
    )
    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )

    user: Mapped["User"] = relationship("User", back_populates="bookmarks")
    job_offer: Mapped["JobOffer"] = relationship("JobOffer", back_populates="bookmarks")


if TYPE_CHECKING:
    from .User import User
    from .JobOffer import JobOffer
