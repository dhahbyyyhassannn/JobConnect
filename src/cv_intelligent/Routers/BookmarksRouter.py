from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import get_db
from ..security.security import get_current_user

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])

@router.get("/bookmarks", response_model=list[schemas.BookmarkOut])
def get_bookmarks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return (
        db.query(models.Bookmark)
        .filter_by(user_id=current_user.user_id)
        .order_by(models.Bookmark.created_at.desc())
        .all()
    )

@router.delete("/jobOffers/{job_offer_id}/bookmark", status_code=status.HTTP_204_NO_CONTENT)
def delete_bookmark(
    job_offer_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    bookmark = (
        db.query(models.Bookmark)
        .filter_by(user_id=current_user.user_id, job_offer_id=job_offer_id)
        .first()
    )
    if bookmark is None:
        raise HTTPException(status_code=404, detail="Bookmark not found")

    db.delete(bookmark)
    db.commit()

