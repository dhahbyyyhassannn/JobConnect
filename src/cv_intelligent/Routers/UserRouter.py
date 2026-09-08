from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..security.security import get_current_user

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/getAllUsers/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@router.get("/me", response_model=schemas.UserOut)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user


@router.post("/become-recruiter", response_model=schemas.UserOut)
def become_recruiter(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role == models.UserRole.RECRUITER:
        raise HTTPException(status_code=400, detail="User is already a recruiter")
    if current_user.role == models.UserRole.ADMIN:
        raise HTTPException(status_code=400, detail="Admins cannot change role")

    current_user.role = models.UserRole.RECRUITER
    db.commit()
    db.refresh(current_user)
    return current_user
