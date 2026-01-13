from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NewsletterCreate(BaseModel):
    email: EmailStr

class PortfolioItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    category: str
    image: str
    technologies: List[str]
    link: Optional[str] = None
    client: Optional[str] = None
    duration: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PortfolioCreate(BaseModel):
    title: str
    description: str
    category: str
    image: str
    technologies: List[str]
    link: Optional[str] = None
    client: Optional[str] = None
    duration: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "NeXLet API - Where Code Meets Creativity"}


# Contact Form Routes
@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactCreate):
    try:
        contact_dict = input.model_dump()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.contacts.insert_one(doc)
        return contact_obj
    except Exception as e:
        logging.error(f"Error creating contact submission: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for contact in contacts:
            if isinstance(contact['timestamp'], str):
                contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
        
        return contacts
    except Exception as e:
        logging.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")


# Newsletter Routes
@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterCreate):
    try:
        # Check if email already exists
        existing = await db.newsletters.find_one({"email": input.email}, {"_id": 0})
        if existing:
            raise HTTPException(status_code=400, detail="Email already subscribed")
        
        newsletter_dict = input.model_dump()
        newsletter_obj = NewsletterSubscription(**newsletter_dict)
        
        doc = newsletter_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.newsletters.insert_one(doc)
        return newsletter_obj
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error subscribing to newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")


# Portfolio Routes
@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio_items():
    try:
        portfolio = await db.portfolio.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
        
        for item in portfolio:
            if isinstance(item['timestamp'], str):
                item['timestamp'] = datetime.fromisoformat(item['timestamp'])
        
        return portfolio
    except Exception as e:
        logging.error(f"Error fetching portfolio: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio items")


@api_router.post("/portfolio", response_model=PortfolioItem)
async def create_portfolio_item(input: PortfolioCreate):
    try:
        portfolio_dict = input.model_dump()
        portfolio_obj = PortfolioItem(**portfolio_dict)
        
        doc = portfolio_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.portfolio.insert_one(doc)
        return portfolio_obj
    except Exception as e:
        logging.error(f"Error creating portfolio item: {e}")
        raise HTTPException(status_code=500, detail="Failed to create portfolio item")


# Seed Portfolio Data (for initial setup)
@api_router.post("/portfolio/seed")
async def seed_portfolio():
    try:
        # Check if portfolio already has data
        count = await db.portfolio.count_documents({})
        if count > 0:
            return {"message": "Portfolio already has data", "count": count}
        
        sample_portfolio = [
            {
                "id": str(uuid.uuid4()),
                "title": "TechCorp Enterprise Platform",
                "description": "Built a comprehensive enterprise platform with real-time analytics, user management, and advanced reporting features. Improved operational efficiency by 60%.",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                "technologies": ["React", "Node.js", "PostgreSQL", "AWS"],
                "client": "TechCorp International",
                "duration": "4 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "HealthTrack Mobile App",
                "description": "Designed and developed a health tracking mobile application with AI-powered insights, workout plans, and nutrition tracking.",
                "category": "UI/UX Design",
                "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
                "technologies": ["React Native", "Firebase", "TensorFlow", "Figma"],
                "client": "HealthTrack Inc.",
                "duration": "3 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "E-Commerce Revolution",
                "description": "Complete e-commerce platform redesign with modern UI, seamless checkout process, and personalized recommendations. Increased conversion rate by 45%.",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
                "technologies": ["Next.js", "Shopify", "Stripe", "Tailwind CSS"],
                "client": "StyleHub Retail",
                "duration": "5 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "FinTech Dashboard",
                "description": "Sophisticated financial dashboard with real-time data visualization, transaction tracking, and predictive analytics for investment decisions.",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                "technologies": ["Vue.js", "D3.js", "Python", "MongoDB"],
                "client": "InvestPro",
                "duration": "6 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "EduLearn Platform",
                "description": "Interactive learning management system with video courses, live sessions, quizzes, and progress tracking for online education.",
                "category": "Landing Page",
                "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
                "technologies": ["React", "FastAPI", "WebRTC", "PostgreSQL"],
                "client": "EduLearn Academy",
                "duration": "4 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Restaurant Booking System",
                "description": "Elegant restaurant booking and management system with real-time table availability, menu showcase, and customer reviews.",
                "category": "Web Development",
                "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
                "technologies": ["React", "Node.js", "MySQL", "Socket.io"],
                "client": "Gourmet Bistro",
                "duration": "2 months",
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        ]
        
        await db.portfolio.insert_many(sample_portfolio)
        return {"message": "Portfolio seeded successfully", "count": len(sample_portfolio)}
    except Exception as e:
        logging.error(f"Error seeding portfolio: {e}")
        raise HTTPException(status_code=500, detail="Failed to seed portfolio")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
