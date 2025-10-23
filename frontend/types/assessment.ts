export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'radio' | 'select' | 'text';
  options?: { value: string; label: string }[];
  risk_weight: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentAnswers {
  [key: string]: string;
}

export interface RiskAssessment {
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  total_questions_answered: number;
}

export interface SecurityRecommendation {
  id?: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  category: string;
}

export interface AssessmentResult {
  assessment_id: number;
  risk_score: number; // At root level
  risk_level: 'low' | 'medium' | 'high' | 'critical'; // At root level
  recommendations: SecurityRecommendation[];
  threat_alerts: any[];
  risk_assessment?: RiskAssessment; // ✅ Added optional
}

export interface AssessmentData {
  sections: AssessmentSection[];
}

export interface SecurityAssessment {
  id: number;
  business_name: string;
  business_email?: string; // NEW: Optional email field
  business_type: string;
  employee_count: string;
  risk_score: number;
  risk_level: string;
  assessment_data: Record<string, any>;
  recommendations: SecurityRecommendation[];
  created_at: string;
}