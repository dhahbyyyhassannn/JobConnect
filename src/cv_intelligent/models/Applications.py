from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base

if TYPE_CHECKING:
    from .User import User
    from .CV import CV
    from .JobOffer import JobOffer
    from .MatchResult import MatchResult


class Application(Base):
    __tablename__ = "applications"

    application_id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    cv_id: Mapped[int] = mapped_column(
        ForeignKey("cvs.cv_id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    job_offer_id: Mapped[int] = mapped_column(
        ForeignKey("job_offers.job_offer_id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    applied_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    # Relationships
    user: Mapped["User"] = relationship(
        "User",
        back_populates="applications"
    )

    cv: Mapped["CV"] = relationship(
        "CV",
        back_populates="applications"
    )

    job_offer: Mapped["JobOffer"] = relationship(
        "JobOffer",
        back_populates="applications"
    )

