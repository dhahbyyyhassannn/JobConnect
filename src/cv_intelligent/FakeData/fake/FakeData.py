"""Idempotent development-data seed.

Run with: ``uv run python -m fake.FakeData``
"""

from datetime import datetime

from cv_intelligent.database import Base, SessionLocal, engine
from cv_intelligent.models import Application, CV, JobCategory, JobOffer, JobRequirement, User
from cv_intelligent.security.security import hash_password

from .FakeJob import FAKE_JOBS
from .FakeUser import FAKE_USERS

from io import BytesIO
from reportlab.pdfgen import canvas

def make_fake_pdf_bytes(text: str) -> bytes:
    buffer = BytesIO()
    c = canvas.Canvas(buffer)
    for i, line in enumerate(text.split("\n")):
        c.drawString(50, 800 - (i * 20), line)
    c.save()
    return buffer.getvalue()

def seed() -> None:
    """Create baseline users and recruiter-owned job offers."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        users: dict[str, User] = {}
        for user_data in FAKE_USERS:
            user = db.query(User).filter_by(email=user_data["email"]).first()
            if user is None:
                user = User(
                    username=user_data["username"],
                    email=user_data["email"],
                    password=hash_password(user_data["password"]),
                    role=user_data["role"],
                )
                db.add(user)
                db.flush()
            users[user_data["email"]] = user

        recruiter = users["recruiter@fake.cv-intelligent.local"]
        candidate = users["user@fake.cv-intelligent.local"]
        jobs: list[JobOffer] = []
        for fake_job in FAKE_JOBS:
            category = db.query(JobCategory).filter_by(
                category_name=fake_job["category"]
            ).first()
            if category is None:
                category = JobCategory(category_name=fake_job["category"])
                db.add(category)
                db.flush()

            job = db.query(JobOffer).filter_by(
                recruiter_id=recruiter.user_id, title=fake_job["title"]
            ).first()
            if job is None:
                job = JobOffer(
                    recruiter_id=recruiter.user_id,
                    job_category_id=category.job_category_id,
                    job_category=fake_job["category"],
                    title=fake_job["title"],
                    description=fake_job["description"],
                    location=fake_job["location"],
                    created_at=datetime.utcnow(),
                )
                db.add(job)
                db.flush()
                db.add_all(
                    JobRequirement(job_offer_id=job.job_offer_id, requirement=requirement)
                    for requirement in fake_job["requirements"]
                )
            jobs.append(job)

        cv = db.query(CV).filter_by(
            user_id=candidate.user_id, file_name="sara-user-cv.pdf"
        ).first()
        if cv is None:
            cv = CV(
                user_id=candidate.user_id,
                file_name="sara-user-cv.pdf",
                data=(
                    b"Sara User\nPython developer with experience in FastAPI, React, "
                    b"SQL, and data analysis."
                ),
            )
            db.add(cv)
            db.flush()

        for job in jobs:
            application = db.query(Application).filter_by(
                user_id=candidate.user_id,
                cv_id=cv.cv_id,
                job_offer_id=job.job_offer_id,
            ).first()
            if application is None:
                db.add(
                    Application(
                        user_id=candidate.user_id,
                        cv_id=cv.cv_id,
                        job_offer_id=job.job_offer_id,
                    )
                )

        recruiter_cv = db.query(CV).filter_by(
            user_id=recruiter.user_id, file_name="rami-recruiter-cv.pdf"
        ).first()
        if recruiter_cv is None:
            recruiter_cv = CV(
                user_id=recruiter.user_id,
                file_name="rami-recruiter-cv.pdf",
                data=make_fake_pdf_bytes(
                    "Rami Recruiter\nRecruiting specialist with experience in "
                    "technical hiring, Python, and product teams."
                ),
            )
            db.add(recruiter_cv)
            db.flush()

        for job in jobs:
            application = db.query(Application).filter_by(
                user_id=recruiter.user_id,
                cv_id=recruiter_cv.cv_id,
                job_offer_id=job.job_offer_id,
            ).first()
            if application is None:
                db.add(
                    Application(
                        user_id=recruiter.user_id,
                        cv_id=recruiter_cv.cv_id,
                        job_offer_id=job.job_offer_id,
                    )
                )

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
    print("Fake users, job offers, CV, and applications seeded.")
