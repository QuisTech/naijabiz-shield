import asyncio
from app.core.database import AsyncSessionLocal
from app.models.assessment import SecurityAssessment
from sqlalchemy import select

async def get_emails():
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(SecurityAssessment)
            .where(SecurityAssessment.business_email.isnot(None))
            .order_by(SecurityAssessment.created_at.desc())
        )
        assessments = result.scalars().all()
        
        print(f"Found {len(assessments)} emails:")
        print("-" * 80)
        for assessment in assessments:
            print(f"Business: {assessment.business_name}")
            print(f"Email: {assessment.business_email}")
            print(f"Date: {assessment.created_at}")
            print("-" * 80)

if __name__ == "__main__":
    asyncio.run(get_emails())