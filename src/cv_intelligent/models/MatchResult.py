from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base


class MatchResult(Base):
    __tablename__ = "match_results"
    __table_args__ = (
        UniqueConstraint("cv_id", "job_offer_id", name="uq_match_results_cv_job_offer"),
    )
    match_result_id: Mapped[int] = mapped_column(primary_key=True)
    cv_id: Mapped[int] = mapped_column(
        ForeignKey("cvs.cv_id", ondelete="CASCADE"), nullable=False, index=True
    )
    job_offer_id: Mapped[int] = mapped_column(
        ForeignKey("job_offers.job_offer_id", ondelete="CASCADE"), nullable=False, index=True
    )
    match_score: Mapped[float] = mapped_column(nullable=False)
    matched: Mapped[bool] = mapped_column(nullable=False)
    explanation: Mapped[str] = mapped_column(Text)
    cv: Mapped["CV"] = relationship("CV", back_populates="match_results")
    job_offer: Mapped["JobOffer"] = relationship("JobOffer", back_populates="match_results")
if TYPE_CHECKING:
    from .CV import CV
    from .JobOffer import JobOffer
