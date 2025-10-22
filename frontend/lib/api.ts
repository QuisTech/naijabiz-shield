import { AssessmentData, AssessmentResult, AssessmentAnswers } from '@/types/assessment';

// Smart API URL detection
const getApiBaseUrl = (): string => {
  // Next.js exposes NEXT_PUBLIC_ env variables in the browser
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    console.log('Using NEXT_PUBLIC_API_URL:', apiUrl);
    return apiUrl;
  }

  if (typeof window !== 'undefined') {
    // Running in browser
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8000';
    }
    // Production fallback
    return 'https://naijabiz-shield.onrender.com';
  }

  // Default fallback for server-side
  return 'https://naijabiz-shield.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();
console.log('API_BASE_URL:', API_BASE_URL);

const isMockMode = false; // You can toggle mock mode if needed

// --- Mock Data ---
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
            { value: 'other', label: 'Other' },
          ],
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
            { value: '50+', label: '50+ employees' },
          ],
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
            { value: 'never', label: 'No, never' },
          ],
        },
      ],
    },
  ],
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
      category: 'authentication',
    },
    {
      id: 2,
      title: 'Regular Data Backups',
      description: 'Set up automated daily backups of your important business data.',
      priority: 'medium',
      category: 'data_protection',
    },
    {
      id: 3,
      title: 'Employee Security Training',
      description: 'Educate your staff about common cyber threats targeting Nigerian businesses.',
      priority: 'medium',
      category: 'education',
    },
  ],
  threat_alerts: [],
};

// --- Real API functions ---
const realApi = {
  async getQuestions(): Promise<AssessmentData> {
    const res = await fetch(`${API_BASE_URL}/api/v1/security/questions`);
    if (!res.ok) throw new Error(`Failed to fetch questions: ${res.statusText}`);
    const data = await res.json();
    return data.data;
  },

  async submitAssessment(businessName: string, answers: AssessmentAnswers): Promise<AssessmentResult> {
    const res = await fetch(`${API_BASE_URL}/api/v1/security/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ business_name: businessName, answers }),
    });
    if (!res.ok) throw new Error(`Failed to submit assessment: ${res.statusText}`);
    const data = await res.json();
    return data.data;
  },

  async downloadReport(assessmentId: number): Promise<Blob> {
    const res = await fetch(`${API_BASE_URL}/api/v1/security/report/${assessmentId}`);
    if (!res.ok) throw new Error(`Failed to download report: ${res.statusText}`);
    return await res.blob();
  },
};

// --- Mock API functions ---
const mockApi = {
  async getQuestions(): Promise<AssessmentData> {
    await new Promise((r) => setTimeout(r, 500));
    return mockQuestions;
  },
  async submitAssessment(businessName: string, answers: AssessmentAnswers): Promise<AssessmentResult> {
    await new Promise((r) => setTimeout(r, 500));
    return { ...mockResult, assessment_id: Math.floor(Math.random() * 1000) };
  },
  async downloadReport(assessmentId: number): Promise<Blob> {
    const report = `Mock Report for Assessment ID: ${assessmentId}`;
    return new Blob([report], { type: 'text/plain' });
  },
};

// --- Exported API ---
export const assessmentApi = isMockMode ? mockApi : realApi;
export const isUsingMockData = isMockMode;
