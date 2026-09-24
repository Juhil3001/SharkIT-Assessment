SEEDED_EMAIL = "demo@sharkit.in"
SEEDED_PASSWORD = "SharkIT@2024"


def validate_credentials(email: str, password: str) -> bool:
    return email == SEEDED_EMAIL and password == SEEDED_PASSWORD
