from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BookmarkOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    bookmark_id: int
    user_id: int
    job_offer_id: int
    created_at: datetime
