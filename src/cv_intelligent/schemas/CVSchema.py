from pydantic import BaseModel, ConfigDict


class CVCreate(BaseModel):
    file_name: str
    data: bytes
    user_id: int


class CVOut(BaseModel):
    cv_id: int
    file_name: str
    data: bytes
    user_id: int

    model_config = ConfigDict(from_attributes=True)
