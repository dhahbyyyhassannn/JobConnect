from pydantic import BaseModel

class JobCategoryOut(BaseModel):
    job_category_id: int
    category_name: str

    class Config:
        from_attributes = True