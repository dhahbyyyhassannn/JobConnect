from fastapi import APIRouter, Depends
from .. import schemas, models
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get('/categories', response_model=list[schemas.JobCategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.JobCategory).all()
