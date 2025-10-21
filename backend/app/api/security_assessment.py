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
        
        # Save to database (optional)
        db_assessment = SecurityAssessment(
            business_name=assessment_data.get('business_name'),
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
    """Get recent security assessments"""
    try:
        from sqlalchemy import text
        result = await db.execute(
            text("SELECT id, business_name, risk_level, risk_score, created_at FROM security_assessments ORDER BY created_at DESC LIMIT 10")
        )
        assessments = result.fetchall()
        
        return {
            "success": True,
            "data": [
                {
                    "id": a.id,
                    "business_name": a.business_name,
                    "risk_level": a.risk_level,
                    "risk_score": a.risk_score,
                    "created_at": a.created_at.isoformat() if a.created_at else None
                }
                for a in assessments
            ],
            "message": "Recent assessments loaded successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading assessments: {str(e)}")