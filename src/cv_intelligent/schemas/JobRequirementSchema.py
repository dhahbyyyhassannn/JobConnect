from pydantic import BaseModel, ConfigDict, Field


class JobRequirementCreate(BaseModel):
    requirement: str = Field(min_length=1, max_length=500)


class JobRequirementOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    job_requirement_id: int
    requirement: str
