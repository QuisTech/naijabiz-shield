import os
from sqlalchemy import select
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.responses import FileResponse
import json
from typing import Dict, Any
import uuid
import os
from pathlib import Path

from app.services.assessment_service import SecurityAssessmentService
from app.services.pdf_service import PDFReportService
from app.models.assessment import SecurityAssessment
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()
assessment_service = SecurityAssessmentService()
pdf_service = PDFReportService()

@router.get("/questions")
async def get_assessment_questions():
    """Get all security assessment questions"""
    try:
        questions = assessment_service.get_assessment_questions()
        return {
            "success": True,
            "data": questions,
            "message": "Assessment questions loaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading questions: {str(e)}")

@router.get("/threats")
async def get_current_threats():
    """Get current security threats for Nigerian businesses"""
    try:
        threats = assessment_service.get_current_threats()
        return {
            "success": True,
            "data": threats,
            "message": "Current threats loaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading threats: {str(e)}")

@router.post("/assess")
async def submit_assessment(assessment_data: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    """Submit security assessment and get results"""
    try:
        # Calculate risk score
        risk_result = await assessment_service.calculate_risk_score(assessment_data.get('answers', {}))
        
        # Generate recommendations
        recommendations = await assessment_service.generate_recommendations(
            assessment_data.get('answers', {}),
            risk_result['risk_level']
        )
        
        # Save to database (with email)
        db_assessment = SecurityAssessment(
            business_name=assessment_data.get('business_name'),
            business_email=assessment_data.get('business_email'),  # NEW: Save email
            business_type=assessment_data.get('answers', {}).get('business_type'),
            employee_count=assessment_data.get('answers', {}).get('employee_count'),
            risk_score=risk_result['risk_score'],
            risk_level=risk_result['risk_level'],
            assessment_data=assessment_data.get('answers', {}),
            recommendations=recommendations
        )
        
        db.add(db_assessment)
        await db.commit()
        await db.refresh(db_assessment)
        
        return {
            "success": True,
            "data": {
                "assessment_id": db_assessment.id,
                "risk_assessment": risk_result,
                "recommendations": recommendations,
                "threat_alerts": assessment_service.get_current_threats()
            },
            "message": "Assessment completed successfully"
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing assessment: {str(e)}")

@router.get("/report/{assessment_id}")
async def generate_pdf_report(assessment_id: int, db: AsyncSession = Depends(get_db)):
    """Generate PDF report for an assessment"""
    try:
        # Get assessment from database using ORM
        from app.models.assessment import SecurityAssessment
        result = await db.execute(
            select(SecurityAssessment).where(SecurityAssessment.id == assessment_id)
        )
        assessment = result.scalar_one_or_none()
        
        if not assessment:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        # Create reports directory if it doesn't exist
        reports_dir = Path("reports")
        reports_dir.mkdir(exist_ok=True)
        
        # Generate PDF
        output_path = reports_dir / f"security_report_{assessment_id}.pdf"
        
        assessment_data = {
            'business_name': assessment.business_name,
            'business_type': assessment.business_type,
            'employee_count': assessment.employee_count,
            'risk_score': assessment.risk_score,
            'risk_level': assessment.risk_level,
            'total_questions_answered': len(assessment.assessment_data) if assessment.assessment_data else 0
        }
        
        # Generate the PDF
        final_path = pdf_service.create_security_report(
            assessment_data,
            assessment.recommendations or [],
            str(output_path)
        )
        
        # Check if we got a PDF or fallback text file
        if final_path.endswith('.pdf'):
            return FileResponse(
                path=final_path,
                filename=f"NaijaBiz_Security_Report_{assessment_id}.pdf",
                media_type='application/pdf'
            )
        else:
            # Return text file if PDF failed
            return FileResponse(
                path=final_path,
                filename=f"NaijaBiz_Security_Report_{assessment_id}.txt",
                media_type='text/plain'
            )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")

@router.get("/assessments")
async def get_recent_assessments(db: AsyncSession = Depends(get_db)):
    """Get recent security assessments - SIMPLIFIED"""
    try:
        from sqlalchemy import text
        result = await db.execute(
            text("SELECT id, business_name, risk_level, risk_score FROM security_assessments ORDER BY id DESC LIMIT 10")
        )
        assessments = result.fetchall()
        
        return {
            "success": True,
            "data": [
                {
                    "id": row[0],
                    "business_name": row[1],
                    "risk_level": row[2],
                    "risk_score": float(row[3]) if row[3] else 0.0
                }
                for row in assessments
            ],
            "message": "Recent assessments loaded successfully"
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/debug/customers")
async def debug_customers(db: AsyncSession = Depends(get_db)):
    """Debug endpoint to see what's in the database"""
    try:
        from sqlalchemy import text
        
        # Try multiple approaches to check table existence
        try:
            # Method 1: Try to count rows (works for both SQLite and PostgreSQL)
            count_result = await db.execute(
                text("SELECT COUNT(*) FROM security_assessments")
            )
            row_count = count_result.scalar_one()
            table_exists = True
        except Exception as e:
            table_exists = False
            row_count = 0
        
        if not table_exists:
            return {
                "error": "security_assessments table does not exist or cannot be accessed",
                "database_type": "PostgreSQL (likely on Render.com)"
            }
        
        # Get sample data without datetime issues
        data_result = await db.execute(
            text("SELECT id, business_name, business_email FROM security_assessments LIMIT 5")
        )
        sample_data = data_result.fetchall()
        
        return {
            "table_exists": True,
            "total_assessments": row_count,
            "sample_data": [
                {"id": row[0], "business_name": row[1], "business_email": row[2]} 
                for row in sample_data
            ],
            "database_type": "Connected successfully"
        }
        
    except Exception as e:
        return {"error": f"Database error: {str(e)}"}

@router.get("/customers/simple")
async def get_customers_simple(db: AsyncSession = Depends(get_db)):
    """Simple customer data without complex processing"""
    try:
        from sqlalchemy import text
        result = await db.execute(
            text("""
                SELECT id, business_name, business_email, business_type, 
                       risk_level, risk_score
                FROM security_assessments 
                ORDER BY id DESC 
                LIMIT 20
            """)
        )
        assessments = result.fetchall()
        
        return {
            "success": True,
            "data": [
                {
                    "id": row[0],
                    "business_name": row[1],
                    "business_email": row[2],
                    "business_type": row[3],
                    "risk_level": row[4],
                    "risk_score": float(row[5]) if row[5] else 0.0
                }
                for row in assessments
            ],
            "total": len(assessments)
        }
        
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.get("/debug/env")
async def debug_environment():
    """Check environment variables"""
    import os
    return {
        "DATABASE_URL_exists": "DATABASE_URL" in os.environ,
        "DATABASE_URL_value": os.getenv('DATABASE_URL', 'NOT_SET')[:50] + "..." if os.getenv('DATABASE_URL') else 'NOT_SET',
        "current_database": "PostgreSQL" if os.getenv('DATABASE_URL') else "SQLite"
    }