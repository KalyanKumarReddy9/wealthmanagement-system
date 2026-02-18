from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

# Load .env (if present)
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# SECRET_KEY should be in env file as JWT_SECRET
SECRET_KEY = os.getenv('JWT_SECRET', 'supersecretkey')
ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '30'))

# Prefer bcrypt if available and healthy, else fall back to pbkdf2_sha256
try:
    import bcrypt as _bcrypt
    # access __about__ if present to detect some broken bcrypt packages
    _ = getattr(_bcrypt, "__about__", None)
    _bcrypt_ok = True
except Exception:
    _bcrypt_ok = False

if _bcrypt_ok:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
else:
    pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return False


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
