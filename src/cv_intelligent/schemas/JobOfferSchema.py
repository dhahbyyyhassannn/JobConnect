from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from .JobRequirementSchema import JobRequirementCreate, JobRequirementOut


class JobOfferCreate(BaseModel):
    title: str 
    description: str
    job_category: str
    requirements: list[JobRequirementCreate]
    location: str


class JobOfferOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    job_offer_id: int
    recruiter_id: int
    job_category_id: int
    jobCategory: str
    title: str
    description: str
    requirements: list[JobRequirementOut]
    location: str
    created_at: datetime


