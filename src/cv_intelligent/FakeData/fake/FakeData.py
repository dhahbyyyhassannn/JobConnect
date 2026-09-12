"""Idempotent development-data seed.

Run with: ``uv run python -m fake.FakeData``
"""

from datetime import datetime
from io import BytesIO

from cv_intelligent.database import Base, SessionLocal, engine
from cv_intelligent.models import (
    Application,
    CV,
    JobCategory,
    JobOffer,
    JobRequirement,
    User,
    UserRole,
)
from cv_intelligent.security.security import hash_password

from .FakeJob import FAKE_JOBS
from .FakeUser import FAKE_USERS

from reportlab.pdfgen import canvas

def make_fake_pdf_bytes(text: str) -> bytes:
    buffer = BytesIO()
    c = canvas.Canvas(buffer)
    for i, line in enumerate(text.split("\n")):
        c.drawString(50, 800 - (i * 20), line)
    c.save()
    return buffer.getvalue()

def seed() -> None:
    """Create one admin, five recruiters, eight users, and their activity."""
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

        recruiters = [
            users[user_data["email"]]
            for user_data in FAKE_USERS
            if user_data["role"] == UserRole.RECRUITER
        ]
        candidates = [
            users[user_data["email"]]
            for user_data in FAKE_USERS
            if user_data["role"] == UserRole.USER
        ]

        for recruiter in recruiters:
            for job in db.query(JobOffer).filter_by(
                recruiter_id=recruiter.user_id
            ).all():
                db.delete(job)
        db.flush()

        candidate_cvs: dict[int, CV] = {}
        for candidate in candidates:
            cv = db.query(CV).filter_by(user_id=candidate.user_id).first()
            if cv is None:
                cv = CV(
                    user_id=candidate.user_id,
                    file_name=f"{candidate.username.lower().replace(' ', '-')}-cv.pdf",
                    data=make_fake_pdf_bytes(
                        f"{candidate.username}\nSoftware professional with experience "
                        "in Python, web development, and collaborative teams."
                    ),
                )
                db.add(cv)
                db.flush()
            candidate_cvs[candidate.user_id] = cv

        for recruiter_index, recruiter in enumerate(recruiters, start=1):
            for job_index, fake_job in enumerate(FAKE_JOBS, start=1):
                category = db.query(JobCategory).filter_by(
                    category_name=fake_job["category"]
                ).first()
                if category is None:
                    category = JobCategory(category_name=fake_job["category"])
                    db.add(category)
                    db.flush()

                job_title = f"{fake_job['title']} - Team {recruiter_index}.{job_index}"
                job = db.query(JobOffer).filter_by(
                    recruiter_id=recruiter.user_id,
                    title=job_title,
                ).first()
                if job is None:
                    job = JobOffer(
                        recruiter_id=recruiter.user_id,
                        job_category_id=category.job_category_id,
                        job_category=fake_job["category"],
                        title=job_title,
                        description=(
                            f"{fake_job['description']} This is opening {job_index} "
                            f"for recruiter team {recruiter_index}."
                        ),
                        location=fake_job["location"],
                        created_at=datetime.utcnow(),
                    )
                    db.add(job)
                    db.flush()
                    db.add_all(
                        JobRequirement(
                            job_offer_id=job.job_offer_id,
                            requirement=requirement,
                        )
                        for requirement in fake_job["requirements"]
                    )

                selected_candidates = [
                    candidates[(job.job_offer_id + offset) % len(candidates)]
                    for offset in range(3)
                ]
                selected_ids = {candidate.user_id for candidate in selected_candidates}
                for application in db.query(Application).filter_by(
                    job_offer_id=job.job_offer_id
                ).all():
                    if application.user_id not in selected_ids:
                        db.delete(application)

                for candidate in selected_candidates:
                    application = db.query(Application).filter_by(
                        user_id=candidate.user_id,
                        job_offer_id=job.job_offer_id,
                    ).first()
                    if application is None:
                        db.add(
                            Application(
                                user_id=candidate.user_id,
                                cv_id=candidate_cvs[candidate.user_id].cv_id,
                                job_offer_id=job.job_offer_id,
                                recruiter_id=recruiter.user_id,
                            )
                        )
                    else:
                        application.cv_id = candidate_cvs[candidate.user_id].cv_id
                        application.recruiter_id = recruiter.user_id

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
    print("Fake users, job offers, CV, and applications seeded.")
