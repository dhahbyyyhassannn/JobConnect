from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/requirement", tags=["Requirement"])


@router.get("/requirementByJobId", response_model=list[schemas.JobRequirementOut])
def getRequirementByJobId(
    job_offer_id: int,
    db: Session = Depends(get_db),
):
    job = db.query(models.JobOffer).filter_by(job_offer_id=job_offer_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job offer not found")

    requirements = (
        db.query(models.JobRequirement)
        .filter(models.JobRequirement.job_offer_id == job_offer_id)
        .order_by(models.JobRequirement.job_requirement_id)
        .all()
    )
    return requirements
