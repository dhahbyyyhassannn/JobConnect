from fastapi import APIRouter, Form, UploadFile, Depends, File, HTTPException
from pydantic import EmailStr
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import get_db
from ..security.security import hash_password, verify_password, create_access_token
import os
from ..schemas.token import GoogleToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/createUser/", response_model=schemas.UserOut)
async def create_user(
    username: str = Form(...),
    email: EmailStr = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    cv_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    existing = db.query(models.User).filter(models.User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    if cv_file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="CV must be a PDF")

    user_role = models.UserRole(role.lower()) if role else models.UserRole.USER

    cv_content = await cv_file.read()
    try:
        db_user = models.User(
            username=username,
            email=email,
            password=hash_password(password),
            role=user_role,
        )

        db.add(db_user)
        db.flush()

        db_cv = models.CV(
            file_name=cv_file.filename,
            data=cv_content,
            user_id=db_user.user_id,
        )
        db.add(db_cv)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        db.rollback()
        print("SIGNUP ERROR:", repr(e))
        raise HTTPException(status_code=500, detail="Signup failed, please try again")
    return db_user

@router.post("/login", response_model=schemas.user.Token)
def login(credentials: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": str(user.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}



@router.post("/google")
def google_login(payload: GoogleToken, db: Session = Depends(get_db)):
    try:
        idinfo = id_token.verify_oauth2_token(
            payload.token, google_requests.Request(), GOOGLE_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    email = idinfo["email"]
    name = idinfo.get("name", email.split("@")[0])

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        # auto-register new users who sign in with Google
        user = models.User(username=name, email=email, password=None)
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(data={"sub": str(user.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}