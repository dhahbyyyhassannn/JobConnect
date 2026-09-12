from fastapi import APIRouter, Depends, HTTPException
from ..models import CV
from ..database import get_db
from ..schemas.CVSchema import CVOut
from sqlalchemy.orm import Session


router = APIRouter(prefix="/cv", tags=["Cv"])


@router.get('/getCvByUserId', response_model=CVOut)
def getCvByUserId(
    user_id: int,
    db: Session = Depends(get_db)
):
    cv = db.query(CV).filter(CV.user_id == user_id).first()
    if cv is None:
        raise HTTPException(status_code=404, detail="No CV found for this user")
    return cv

