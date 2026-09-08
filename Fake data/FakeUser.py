"""The three baseline users used by the development seed."""

from cv_intelligent.models import UserRole

FAKE_ADMIN_PASSWORD = "Admin123!"
FAKE_RECRUITER_PASSWORD = "Recruiter123!"
FAKE_USER_PASSWORD = "User123!"

FAKE_USERS = (
    {
        "username": "Alice Admin",
        "email": "admin@fake.cv-intelligent.local",
        "password": FAKE_ADMIN_PASSWORD,
        "password_hash": "$2b$12$vFqqPWH39Ertom3GZ/nvlOPp01y.9ZgYrIhxRdxvindrVTZls6mgC",
        "role": UserRole.ADMIN,
    },
    {
        "username": "Rami Recruiter",
        "email": "recruiter@fake.cv-intelligent.local",
        "password": FAKE_RECRUITER_PASSWORD,
        "password_hash": "$2b$12$rAHjk4wwn09Gt8tba9g0Q.VJ7rRgLI3AzHXVZ5FWin3vT9gXadMgC",
        "role": UserRole.RECRUITER,
    },
    {
        "username": "Sara User",
        "email": "user@fake.cv-intelligent.local",
        "password": FAKE_USER_PASSWORD,
        "password_hash": "$2b$12$.Zdv2amACz8d3Yi..UD4I.2frlaLZa.ylDbOK3dpam/70btAyXNmC",
        "role": UserRole.USER,
    },
)
