from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.core.config import settings

# Use SQLite for development - no external database needed
engine = create_async_engine(
    "sqlite+aiosqlite:///./naijabiz_dev.db", 
    connect_args={"check_same_thread": False},
    echo=True  # Show SQL queries in console
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