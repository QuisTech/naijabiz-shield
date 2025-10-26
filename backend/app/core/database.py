from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings
import os

# Use PostgreSQL from environment variable (Supabase)
DATABASE_URL = os.getenv('DATABASE_URL', '').replace('postgresql://', 'postgresql+asyncpg://')

if not DATABASE_URL:
    # Fallback to SQLite for local development
    DATABASE_URL = "sqlite+aiosqlite:///./naijabiz_dev.db"
    connect_args = {"check_same_thread": False}
else:
    connect_args = {}

engine = create_async_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=True,  # Show SQL queries in console
    # PostgreSQL connection settings
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)

AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()