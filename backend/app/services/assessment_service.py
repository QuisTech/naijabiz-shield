import json
import os
from typing import Dict, List, Any
from pathlib import Path

class SecurityAssessmentService:
    def __init__(self):
        self.questions_data = self.load_questions()
        self.threat_alerts = self.load_threat_alerts()

    def load_questions(self) -> Dict:
        """Load assessment questions from JSON file"""
        questions_path = Path(__file__).parent.parent / "data" / "assessment_questions.json"
        with open(questions_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def load_threat_alerts(self) -> List[Dict]:
        """Load current threat alerts for Nigeria"""
        return [
            {
                "id": 1,
                "title": "WhatsApp Business Account Hijacking",
                "description": "Scammers are targeting small business WhatsApp accounts to impersonate business owners and request payments from customers.",
                "severity": "high",
                "category": "social_engineering",
                "recommendation": "Enable two-step verification on WhatsApp and educate customers about verified business accounts."
            },
            {
                "id": 2,
                "title": "Fake Bank Alert Scams",
                "description": "Fraudsters are sending fake bank transfer alerts to businesses, especially for high-value transactions.",
                "severity": "critical",
                "category": "fraud",
                "recommendation": "Always verify transactions through your bank's official app or by calling your bank directly."
            }
        ]

    async def calculate_risk_score(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate risk score based on assessment answers"""
        total_score = 0.0
        max_possible_score = 0.0
        
        # Calculate scores for each question
        for section in self.questions_data["sections"]:
            for question in section["questions"]:
                qid = question["id"]
                max_possible_score += question["risk_weight"]
                
                if qid in answers:
                    answer = answers[qid]
                    # Simple scoring logic - can be enhanced
                    if question["type"] == "radio":
                        if answer == "yes":
                            total_score += question["risk_weight"]
                    elif question["type"] == "select":
                        # Higher risk for larger businesses
                        if qid == "employee_count":
                            if answer == "50+":
                                total_score += question["risk_weight"]
                            elif answer == "21-50":
                                total_score += question["risk_weight"] * 0.75
                            elif answer == "6-20":
                                total_score += question["risk_weight"] * 0.5
        
        # Calculate percentage and determine risk level
        risk_percentage = (total_score / max_possible_score) * 100 if max_possible_score > 0 else 0
        
        if risk_percentage < 25:
            risk_level = "low"
        elif risk_percentage < 50:
            risk_level = "medium"
        elif risk_percentage < 75:
            risk_level = "high"
        else:
            risk_level = "critical"

        return {
            "risk_score": risk_percentage,
            "risk_level": risk_level,
            "total_questions_answered": len(answers)
        }

    async def generate_recommendations(self, answers: Dict[str, Any], risk_level: str) -> List[Dict]:
        """Generate personalized security recommendations"""
        recommendations = []
        
        # Basic recommendations for all businesses
        base_recommendations = [
            {
                "priority": "high",
                "title": "Enable Two-Factor Authentication",
                "description": "Add an extra layer of security to your email and social media accounts.",
                "category": "authentication"
            },
            {
                "priority": "medium",
                "title": "Regular Data Backups",
                "description": "Backup important business data weekly to an external drive or cloud storage.",
                "category": "data_protection"
            }
        ]
        
        # Context-specific recommendations
        if answers.get("online_payments") == "yes":
            recommendations.append({
                "priority": "critical",
                "title": "Payment Security Verification",
                "description": "Always verify high-value transactions through multiple channels before delivering goods/services.",
                "category": "financial"
            })
        
        if answers.get("employee_count") in ["6-20", "21-50", "50+"]:
            recommendations.append({
                "priority": "medium",
                "title": "Employee Security Training",
                "description": "Conduct basic cybersecurity awareness training for all employees.",
                "category": "education"
            })
        
        # Add base recommendations
        recommendations.extend(base_recommendations)
        
        # Sort by priority
        priority_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        recommendations.sort(key=lambda x: priority_order[x["priority"]])
        
        return recommendations

    def get_assessment_questions(self) -> Dict:
        """Return all assessment questions"""
        return self.questions_data

    def get_current_threats(self) -> List[Dict]:
        """Return current threat alerts for Nigeria"""
        return self.threat_alerts