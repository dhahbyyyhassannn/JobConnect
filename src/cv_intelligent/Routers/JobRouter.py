from fastapi import APIRouter, Depends, HTTPException
from .. import schemas, models
from sqlalchemy.orm import Session
from ..models import JobOffer
from ..schemas import JobOfferCreate
from ..database import get_db
from ..security.security import get_current_user

router = APIRouter(prefix="/job", tags=["Job"])


@router.get('/getJobById')
def getJobById(
    job_offer_id: int,
    db: Session = Depends(get_db)
):
    job = db.get(models.JobOffer, job_offer_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job



@router.post('/createJobOffer')
def createJobOffer(
    job_offer: JobOfferCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    category = db.query(models.JobCategory).filter(
        models.JobCategory.category_name == job_offer.job_category
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Job category not found"
        )

    newJobOffer = JobOffer(
        title= job_offer.title,
        description= job_offer.description,
        job_category_id=category.job_category_id,
        job_category=category.category_name,                  
        location=job_offer.location,
        recruiter_id=current_user.user_id
    )
    db.add(newJobOffer)
    db.flush()
    for req in job_offer.requirements:
        db_requirement = models.JobRequirement(
            job_offer_id=newJobOffer.job_offer_id,
            requirement=req.requirement, 
        )
        db.add(db_requirement)
    db.commit()
    db.refresh(newJobOffer)
    return newJobOffer


@router.post("/jobOffers/{job_offer_id}/bookmark", response_model=schemas.BookmarkOut)
def create_bookmark(
    job_offer_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    job_offer = db.get(models.JobOffer, job_offer_id)
    if job_offer is None:
        raise HTTPException(status_code=404, detail="Job offer not found")

    bookmark = (
        db.query(models.Bookmark)
        .filter_by(user_id=current_user.user_id, job_offer_id=job_offer_id)
        .first()
    )
    if bookmark is None:
        bookmark = models.Bookmark(user_id=current_user.user_id, job_offer_id=job_offer_id)
        db.add(bookmark)
        db.commit()
        db.refresh(bookmark)
    return bookmark




@router.get("/getJobsByRecruiterId/", response_model=list[schemas.JobOfferOut])
def jobs_by_recruiter_id(
    recruiter_id: int,
    db: Session = Depends(get_db),
):
    return (
        db.query(models.JobOffer)
        .filter(models.JobOffer.recruiter_id == recruiter_id)
        .order_by(models.JobOffer.created_at.desc())
        .all()
    )


@router.delete('/deleteJobById')
def deleteJobById(
    job_offer_id: int, 
    db: Session = Depends(get_db)):
    job = db.query(JobOffer).filter(JobOffer.job_offer_id == job_offer_id).first()
    if not job:
        raise HTTPException(status_code=400, detail='job not found')
    db.delete(job)
    db.commit()


@router.get('/allJobs', response_model=list[schemas.JobOfferOut])
def getAllJobs(
    db: Session = Depends(get_db)
):
    jobs = db.query(JobOffer).all()
    return jobs
