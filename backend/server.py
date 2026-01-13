from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta

# ================= SECURITY CONFIG =================
SECRET_KEY = "CHANGE_THIS_TO_A_RANDOM_SECRET_123456"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"], deprecated="auto"
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")

# ================= APP =================
app = FastAPI(title="NeXLet API")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://nexlet.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= MONGODB =================
MONGO_URL = "mongodb+srv://rajasiddharthrajasiddharth_db_user:rajasiddharth2006@cluster0.jajcrhl.mongodb.net/nexlet?retryWrites=true&w=majority"

client = MongoClient(MONGO_URL, server_api=ServerApi("1"))
db = client["nexlet"]
contacts = db["contacts"]

# ================= ROUTER =================
api = APIRouter(prefix="/api")

# ================= MODELS =================
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    service: str | None = None
    message: str


class AdminLogin(BaseModel):
    username: str
    password: str

# ================= ADMIN (TEMP HARDCODED) =================
ADMIN_USERNAME = "nexlet"
ADMIN_PASSWORD_HASH = pwd_context.hash("nexlet5216")  # change later

# ================= HELPERS =================
def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(username: str):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": username,
        "exp": expire
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("sub") != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Unauthorized")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ================= ROUTES =================

@api.get("/")
def api_root():
    return {"message": "NeXLet API is running"}

# -------- ADMIN LOGIN --------
@api.post("/admin/login")
def admin_login(data: AdminLogin):
    if data.username != ADMIN_USERNAME:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data.username)
    return {
        "access_token": token,
        "token_type": "bearer"
    }

# -------- CONTACT (PUBLIC) --------
@api.post("/contact")
def create_contact(data: ContactCreate):
    try:
        contacts.insert_one({
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "service": data.service,
            "message": data.message,
            "timestamp": datetime.utcnow()
        })
        return {"success": True, "message": "Message sent successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to send message")

# -------- CONTACT (ADMIN PROTECTED) --------
@api.get("/contact")
def get_contacts(admin=Depends(get_current_admin)):
    try:
        result = []
        for doc in contacts.find().sort("timestamp", -1):
            result.append({
                "id": str(doc["_id"]),
                "name": doc.get("name"),
                "email": doc.get("email"),
                "phone": doc.get("phone"),
                "service": doc.get("service"),
                "message": doc.get("message"),
                "timestamp": doc.get("timestamp")
            })
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to load contacts")

# ================= REGISTER ROUTER =================
app.include_router(api)
