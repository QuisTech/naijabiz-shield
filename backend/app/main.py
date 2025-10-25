from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config import settings
from app.api import security_assessment, reports
from app.core.database import engine, Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    print("Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # NEW: Check if we need to add the email column
    try:
        from sqlalchemy import text
        async with engine.connect() as conn:
            # Check if business_email column exists
            result = await conn.execute(text("PRAGMA table_info(security_assessments)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'business_email' not in columns:
                print("Adding business_email column to security_assessments table...")
                await conn.execute(text("ALTER TABLE security_assessments ADD COLUMN business_email VARCHAR(255)"))
                await conn.commit()
                print("Column added successfully!")
    except Exception as e:
        print(f"Note: Could not check/alter table structure: {e}")
    
    yield
    # Shutdown
    await engine.dispose()

app = FastAPI(
    title="NaijaBiz Shield API",
    description="Digital Resilience Platform for Nigerian SMEs",
    version="1.0.0",
    lifespan=lifespan
)

# Allowed origins
allowed_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://naijabiz-shield-insp-git-main-quistechs-projects.vercel.app",
        "https://naijabiz-shield-insp.vercel.app",
        "https://naijabiz-shield-insp-ik639jhik-quistechs-projects.vercel.app"
        "https://naijabiz-shield-insp-*.vercel.app",
        "https://*.vercel.app"
]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Add your frontend domains here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(security_assessment.router, prefix="/api/v1/security", tags=["security"])
app.include_router(reports.router, prefix="/api/v1/reports", tags=["reports"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to NaijaBiz Shield API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "naijabiz-shield"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
