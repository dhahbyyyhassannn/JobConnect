"""The three baseline users used by the development seed."""

from cv_intelligent.models import UserRole


FAKE_USERS = (
    {
        "username": "Alice Admin",
        "email": "admin@fake.cv-intelligent.local",
        "password": "Admin123!",
        "role": UserRole.ADMIN,
    },
    {
        "username": "Rami Recruiter",
        "email": "recruiter@fake.cv-intelligent.local",
        "password": "Recruiter123!",
        "role": UserRole.RECRUITER,
    },
    {
        "username": "Sara User",
        "email": "user@fake.cv-intelligent.local",
        "password": "User123!",
        "role": UserRole.USER,
    },
)
