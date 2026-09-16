from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
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


@router.get("/{cv_id}/pdf")
def get_cv_pdf(
    cv_id: int,
    db: Session = Depends(get_db)
):
    cv = db.query(CV).filter(CV.cv_id == cv_id).first()
    if not cv:
        raise HTTPException(
            status_code=404,
            details="CV not found"
        )

    return Response(
        content = cv.data,
        media_type = "application/pdf",
        headers={
            "Content-Disposition": f'inline filename="{cv.file_name}"'
        })