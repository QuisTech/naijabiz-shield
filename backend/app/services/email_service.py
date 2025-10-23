import re
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    def validate_email(self, email: str) -> Dict[str, Any]:
        """Validate email format and common Nigerian email providers"""
        if not email:
            return {"valid": False, "message": "Email is required"}
        
        # Basic format validation
        if not re.match(self.email_regex, email):
            return {"valid": False, "message": "Please enter a valid email address"}
        
        # Common Nigerian email providers validation
        nigerian_domains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'naij.com', 'nigerian.email', 'ymail.com'
        ]
        
        domain = email.split('@')[1].lower()
        if domain not in nigerian_domains:
            logger.info(f"Non-standard email domain used: {domain}")
            # We don't block non-standard domains, just log for awareness
        
        return {"valid": True, "message": "Email is valid"}
    
    def sanitize_email(self, email: str) -> str:
        """Sanitize email input"""
        return email.strip().lower()