import { AssessmentData, AssessmentResult, AssessmentAnswers } from '@/types/assessment';

const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Running in browser
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl) return envUrl;

    if (window.location.hostname === 'localhost') return 'http://localhost:8000';
    return 'https://naijabiz-shield.onrender.com'; // Render backend fallback
  }

  // Default server-side fallback
  return process.env.NEXT_PUBLIC_API_URL || 'https://naijabiz-shield.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

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

export const assessmentApi = realApi;
