from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_assessment_stats():
    """Get overall assessment statistics"""
    # This would typically query the database
    return {
        "success": True,
        "data": {
            "total_assessments": 150,
            "average_risk_score": 42.5,
            "risk_distribution": {
                "low": 35,
                "medium": 45,
                "high": 15,
                "critical": 5
            }
        }
    }