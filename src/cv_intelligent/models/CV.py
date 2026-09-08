from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, LargeBinary
from sqlalchemy.orm import Mapped, mapped_column, relationship

from cv_intelligent.database import Base

if TYPE_CHECKING:
    from .User import User
    from .Applications import Application
    from .MatchResult import MatchResult

class CV(Base):
    __tablename__ = "cvs"
    cv_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    file_name: Mapped[str] = mapped_column()
    data: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False, index=True
    )
    user: Mapped["User"] = relationship("User", back_populates="cvs")
    applications: Mapped[list["Application"]] = relationship(
        "Application", back_populates="cv", cascade="all, delete-orphan", passive_deletes=True
    )
    match_results: Mapped[list["MatchResult"]] = relationship(
        "MatchResult", back_populates="cv", cascade="all, delete-orphan", passive_deletes=True
    )
