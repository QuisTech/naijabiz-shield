import { AssessmentData, AssessmentResult, AssessmentAnswers } from '@/types/assessment';

// Smart API URL detection
const getApiBaseUrl = () => {
  // ✅ 1. Use environment variable if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // ✅ 2. Use local backend only in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }

  // ✅ 3. Use Render backend for production fallback
  return 'https://naijabiz-shield.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();
const isMockMode = API_BASE_URL === null; // Always false now unless explicitly set to null

// Mock data (used only if API_BASE_URL === null)
const mockQuestions: AssessmentData = {
  sections: [
    {
      id: 'business-info',
      title: 'Business Information',
      questions: [
        {
          id: 'business_type',
          question: 'What type of business do you operate?',
          type: 'radio',
          risk_weight: 1.0,
          options: [
            { value: 'retail', label: 'Retail Store' },
            { value: 'service', label: 'Service Business' },
            { value: 'tech', label: 'Technology Company' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'employee_count',
          question: 'How many employees does your business have?',
          type: 'radio',
          risk_weight: 1.2,
          options: [
            { value: '1-5', label: '1-5 employees' },
            { value: '6-20', label: '6-20 employees' },
            { value: '21-50', label: '21-50 employees' },
            { value: '50+', label: '50+ employees' }
          ]
        },
        {
          id: 'data_backup',
          question: 'Do you regularly backup your business data?',
          type: 'radio',
          risk_weight: 1.8,
          options: [
            { value: 'daily', label: 'Yes, daily' },
            { value: 'weekly', label: 'Yes, weekly' },
            { value: 'monthly', label: 'Yes, monthly' },
            { value: 'never', label: 'No, never' }
          ]
        }
      ]
    }
  ]
};

const mockResult: AssessmentResult = {
  assessment_id: Math.floor(Math.random() * 1000),
  risk_score: 65,
  risk_level: 'medium',
  recommendations: [
    {
      id: 1,
      title: 'Implement Two-Factor Authentication',
      description: 'Add an extra layer of security to your business accounts and email.',
      priority: 'high',
      category: 'authentication'
    },
    {
      id: 2,
      title: 'Regular Data Backups',
      description: 'Set up automated daily backups of your important business data.',
      priority: 'medium',
      category: 'data_protection'
    },
    {
      id: 3,
      title: 'Employee Security Training',
      description: 'Educate your staff about common cyber threats targeting Nigerian businesses.',
      priority: 'medium',
      category: 'education'
    }
  ],
  threat_alerts: []
};

// Real API functions
const realApi = {
  async getQuestions(): Promise<AssessmentData> {
    const response = await fetch(`${API_BASE_URL}/api/v1/security/questions`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    const data = await response.json();
    return data.data;
  },

  async submitAssessment(businessName: string, answers: AssessmentAnswers): Promise<AssessmentResult> {
    const response = await fetch(`${API_BASE_URL}/api/v1/security/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business_name: businessName, answers }),
    });
    if (!response.ok) throw new Error('Failed to submit assessment');
    const data = await response.json();
    return data.data;
  },

  async downloadReport(assessmentId: number): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/v1/security/report/${assessmentId}`);
    if (!response.ok) throw new Error('Failed to download report');
    return await response.blob();
  }
};

// Mock API (used only if explicitly in mock mode)
const mockApi = {
  async getQuestions(): Promise<AssessmentData> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockQuestions;
  },

  async submitAssessment(businessName: string, answers: AssessmentAnswers): Promise<AssessmentResult> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log('Business:', businessName, 'Answers:', answers);
    return {
      ...mockResult,
      assessment_id: Math.floor(Math.random() * 1000),
      risk_score: Math.floor(Math.random() * 40) + 30,
      risk_level: 'medium'
    };
  },

  async downloadReport(assessmentId: number): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const reportContent = `
NAIJABIZ SHIELD - SECURITY ASSESSMENT REPORT
Assessment ID: ${assessmentId}
Generated: ${new Date().toLocaleDateString()}

SECURITY ASSESSMENT COMPLETE!

Your Nigerian business has been assessed for digital security risks.
This demo shows the assessment workflow. In a full implementation,
you would receive personalized security recommendations.

Thank you for using NaijaBiz Shield!
    `.trim();
    return new Blob([reportContent], { type: 'text/plain' });
  }
};

export const assessmentApi = isMockMode ? mockApi : realApi;
export const isUsingMockData = isMockMode;
