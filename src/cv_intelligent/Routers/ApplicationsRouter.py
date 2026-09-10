from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from cv_intelligent.database import get_db
from cv_intelligent.models.Applications import Application
from cv_intelligent.models.MatchResult import MatchResult
from cv_intelligent.security.security import get_current_user
from ..services.CVParser import extract_cv_text
from ..services.llm_services import analyze_match_with_llm
from ..schemas.ApplicationsSchema import ApplicationCreate, ApplicationOut
router = APIRouter(prefix="/applications", tags=["Applications"])

    

@router.post('/applicationCreate', response_model=ApplicationOut)
def createApplication(
    application: ApplicationCreate,
    db: Session = Depends(get_db)):
    newApplication = Application(
        user_id= application.user_id,
        cv_id= application.cv_id,
        job_offer_id= application.job_offer_id)

    db.add(newApplication)
    db.refresh()
    db.commit(newApplication)




@router.get('/user/{user_id}')
def getApplicationsByUserId(user_id: int, 
    db: Session = Depends(get_db)):
    applications = db.query(Application).filter(Application.user_id == user_id).all()
    return applications




@router.post("/{application_id}/analyze")
async def analyze_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    application = db.query(Application).filter(
        Application.application_id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    cv = application.cv
    job = application.job_offer

    # Extract CV text
    cv_text = extract_cv_text(cv.data)

    # Prepare job information
    job_text = f"""
    Title:
    {job.title}

    Description:
    {job.description}

    Requirements:
    {job.requirements}
    """

    # Send both to the LLM
    result = analyze_match_with_llm(
        cv_text,
        job_text
    )

    # Save result
    existing_match = db.query(MatchResult).filter_by(
        cv_id=cv.cv_id, job_offer_id=job.job_offer_id
    ).first()

    if existing_match:
        existing_match.match_score = result["score"]
        existing_match.matched = result["matched"]
        existing_match.explanation = result["explanation"]
    else:
        existing_match = MatchResult(
            cv_id=cv.cv_id,
            job_offer_id=job.job_offer_id,
            match_score=result["score"],
            matched=result["matched"],
            explanation=result["explanation"]
        )
        db.add(existing_match)

    db.commit()

    return result