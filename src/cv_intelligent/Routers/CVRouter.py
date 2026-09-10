from fastapi import APIRouter, Depends
from ..models import CV
from ..database import get_db
from ..schemas.CVSchema import CVOut
from sqlalchemy.orm import Session


router = APIRouter(prefix="/cv", tags=["Cv"])


@router.get('/getCvByUserId', response_model=list[CVOut])
def getCvByUserId(
    user_id: int,
    db: Session = Depends(get_db)
):
    cv = db.query(CV).filter(CV.user_id == user_id).first()
    return cv

