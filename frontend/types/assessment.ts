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
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  category: string;
}

export interface AssessmentResult {
  assessment_id: number;
  risk_assessment: RiskAssessment;
  recommendations: SecurityRecommendation[];
  threat_alerts: any[];
}

export interface AssessmentData {
  sections: AssessmentSection[];
}