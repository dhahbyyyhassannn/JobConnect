from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ApplicationOut(BaseModel):
    application_id: int
    user_id: int
    cv_id: int
    job_offer_id: int
    recruiter_id: int
    applied_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ApplicationCreate(BaseModel):
    user_id: int
    cv_id: int
    job_offer_id: int
    recruiter_id: int