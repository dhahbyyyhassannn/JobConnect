from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..security.security import get_current_user

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])


@router.post("/createBookmark", response_model=schemas.BookmarkOut)
def create_bookmark(
    bookmark: schemas.BookmarkCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    job_offer = db.get(models.JobOffer, bookmark.job_offer_id)
    if job_offer is None:
        raise HTTPException(status_code=404, detail="Job offer not found")

    existing_bookmark = (
        db.query(models.Bookmark)
        .filter_by(user_id=current_user.user_id, job_offer_id=bookmark.job_offer_id)
        .first()
    )
    if existing_bookmark is not None:
        return existing_bookmark

    new_bookmark = models.Bookmark(
        user_id=current_user.user_id,
        job_offer_id=bookmark.job_offer_id,
    )
    db.add(new_bookmark)
    db.commit()
    db.refresh(new_bookmark)
    return new_bookmark


@router.get("/", response_model=list[schemas.BookmarkOut])
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


@router.delete("/{job_offer_id}", status_code=status.HTTP_204_NO_CONTENT)
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

