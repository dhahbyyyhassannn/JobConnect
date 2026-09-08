from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base


class JobRequirement(Base):
    __tablename__ = "job_requirements"

    job_requirement_id: Mapped[int] = mapped_column(primary_key=True)
    job_offer_id: Mapped[int] = mapped_column(
        ForeignKey("job_offers.job_offer_id", ondelete="CASCADE"), nullable=False, index=True
    )
    requirement: Mapped[str] = mapped_column(String(500), nullable=False)

    job_offer: Mapped["JobOffer"] = relationship("JobOffer", back_populates="requirements")


if TYPE_CHECKING:
    from .JobOffer import JobOffer
