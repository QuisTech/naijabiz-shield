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
                    
                    # Online Payments - Higher risk if accepting payments
                    if qid == "online_payments":
                        if answer == "yes":
                            total_score += question["risk_weight"] * 0.8
                        elif answer == "sometimes":
                            total_score += question["risk_weight"] * 0.4
                    
                    # Two-Factor Authentication - Higher risk if not using
                    elif qid == "two_factor":
                        if answer == "no":
                            total_score += question["risk_weight"]
                        elif answer == "some_accounts":
                            total_score += question["risk_weight"] * 0.5
                    
                    # Website Presence - Having a website increases exposure
                    elif qid == "has_website":
                        if answer == "yes":
                            total_score += question["risk_weight"] * 0.6
                    
                    # Social Media Usage - Increases brand impersonation risk
                    elif qid == "social_media":
                        if answer == "yes_regularly":
                            total_score += question["risk_weight"] * 0.7
                        elif answer == "yes_occasionally":
                            total_score += question["risk_weight"] * 0.4
                    
                    # Employee Training - No training = higher human risk
                    elif qid == "employee_training":
                        if answer == "no":
                            total_score += question["risk_weight"]
                        elif answer == "some_trained":
                            total_score += question["risk_weight"] * 0.5
                    
                    # Software Updates - Outdated software = vulnerabilities
                    elif qid == "software_updates":
                        if answer == "rarely":
                            total_score += question["risk_weight"]
                        elif answer == "when_reminded":
                            total_score += question["risk_weight"] * 0.6
                    
                    # Annual Revenue - Higher revenue = bigger target
                    elif qid == "annual_revenue":
                        if answer in ["10m+", "5m-10m"]:
                            total_score += question["risk_weight"]
                        elif answer == "1m-5m":
                            total_score += question["risk_weight"] * 0.7
                        elif answer == "500k-1m":
                            total_score += question["risk_weight"] * 0.4
                    
                    # Existing logic for radio and select questions
                    elif question["type"] == "radio":
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
        
        # Online Payments
        if answers.get("online_payments") in ["yes", "sometimes"]:
            recommendations.append({
                "priority": "high",
                "title": "Payment Security Verification",
                "description": "Implement multi-channel verification for all online transactions to prevent fraud.",
                "category": "financial"
            })
        
        # Two-Factor Authentication
        if answers.get("two_factor") in ["no", "some_accounts"]:
            recommendations.append({
                "priority": "high",
                "title": "Enable Two-Factor Authentication",
                "description": "Protect all business accounts (email, banking, social media) with 2FA.",
                "category": "authentication"
            })
        
        # Website Security
        if answers.get("has_website") == "yes":
            recommendations.append({
                "priority": "medium",
                "title": "Website Security Audit",
                "description": "Regularly check your website for vulnerabilities and keep all plugins updated.",
                "category": "web_security"
            })
        
        # Social Media
        if answers.get("social_media") in ["yes_regularly", "yes_occasionally"]:
            recommendations.append({
                "priority": "medium",
                "title": "Social Media Monitoring",
                "description": "Monitor for fake accounts impersonating your business and educate customers.",
                "category": "brand_protection"
            })
        
        # Employee Training
        if answers.get("employee_training") in ["no", "some_trained"]:
            recommendations.append({
                "priority": "medium",
                "title": "Cybersecurity Training Program",
                "description": "Implement regular security awareness training for all employees.",
                "category": "education"
            })
        
        # Software Updates
        if answers.get("software_updates") in ["rarely", "when_reminded"]:
            recommendations.append({
                "priority": "high",
                "title": "Automated Software Updates",
                "description": "Enable automatic updates for all business software and operating systems.",
                "category": "system_maintenance"
            })
        
        # High Revenue - Additional security measures
        if answers.get("annual_revenue") in ["10m+", "5m-10m"]:
            recommendations.append({
                "priority": "medium",
                "title": "Enhanced Security Monitoring",
                "description": "Consider professional security monitoring services for your business scale.",
                "category": "advanced_security"
            })
        
        # Existing context-specific recommendations
        if answers.get("employee_count") in ["6-20", "21-50", "50+"]:
            recommendations.append({
                "priority": "medium",
                "title": "Employee Security Training",
                "description": "Conduct basic cybersecurity awareness training for all employees.",
                "category": "education"
            })
        
        # Base recommendations for all businesses
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
        
        # Add base recommendations
        recommendations.extend(base_recommendations)
        
        # Remove duplicates and sort by priority
        seen = set()
        unique_recommendations = []
        for rec in recommendations:
            identifier = rec["title"]
            if identifier not in seen:
                seen.add(identifier)
                unique_recommendations.append(rec)
        
        priority_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        unique_recommendations.sort(key=lambda x: priority_order[x["priority"]])
        
        return unique_recommendations

    def get_assessment_questions(self) -> Dict:
        """Return all assessment questions"""
        return self.questions_data

    def get_current_threats(self) -> List[Dict]:
        """Return current threat alerts for Nigeria"""
        return self.threat_alerts