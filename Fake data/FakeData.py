"""Idempotent development-data seed.

Run with: ``uv run python \"Fake data/FakeData.py\"``
"""

from datetime import datetime

from cv_intelligent.database import Base, SessionLocal, engine
from cv_intelligent.models import JobCategory, JobOffer, JobRequirement, User

from FakeJob import FAKE_CATEGORY, FAKE_JOB
from FakeUser import FAKE_USERS


def seed() -> None:
    """Create one admin, recruiter, user, and a recruiter-owned job offer."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        users: dict[str, User] = {}
        for user_data in FAKE_USERS:
            user = db.query(User).filter_by(email=user_data["email"]).first()
            if user is None:
                user = User(
                    username=user_data["username"], email=user_data["email"],
                    password=user_data["password_hash"], role=user_data["role"],
                )
                db.add(user)
                db.flush()
            else:
                user.username = user_data["username"]
                user.password = user_data["password_hash"]
                user.role = user_data["role"]
            users[user_data["email"]] = user

        category = db.query(JobCategory).filter_by(category_name=FAKE_CATEGORY).first()
        if category is None:
            category = JobCategory(category_name=FAKE_CATEGORY)
            db.add(category)
            db.flush()

        recruiter = users["recruiter@fake.cv-intelligent.local"]
        job = db.query(JobOffer).filter_by(
            recruiter_id=recruiter.user_id, title=FAKE_JOB["title"]
        ).first()
        if job is None:
            job = JobOffer(
                recruiter_id=recruiter.user_id, job_category_id=category.job_category_id,
                jobCategory=FAKE_CATEGORY, title=FAKE_JOB["title"],
                description=FAKE_JOB["description"], location=FAKE_JOB["location"],
                created_at=datetime.utcnow(),
            )
            db.add(job)
            db.flush()
            db.add_all(
                JobRequirement(job_offer_id=job.job_offer_id, requirement=requirement)
                for requirement in FAKE_JOB["requirements"]
            )
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()
    print("Fake users and job offer seeded.")
