from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base


class JobCategory(Base):
    __tablename__ = "job_categories"

    job_category_id: Mapped[int] = mapped_column(primary_key=True)
    category_name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    job_offers: Mapped[list["JobOffer"]] = relationship(
        "JobOffer", back_populates="category"
    )


if TYPE_CHECKING:
    from .JobOffer import JobOffer
