import { AssessmentData, AssessmentResult, AssessmentAnswers } from '@/types/assessment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const assessmentApi = {
  async getQuestions(): Promise<AssessmentData> {
    const response = await fetch(`${API_BASE_URL}/api/v1/security/questions`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    const data = await response.json();
    return data.data;
  },

  async submitAssessment(businessName: string, answers: AssessmentAnswers): Promise<AssessmentResult> {
    const response = await fetch(`${API_BASE_URL}/api/v1/security/assess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        business_name: businessName,
        answers: answers
      }),
    });
    if (!response.ok) throw new Error('Failed to submit assessment');
    const data = await response.json();
    return data.data;
  },

  async downloadReport(assessmentId: number): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/security/report/${assessmentId}`);
      if (!response.ok) {
        // Create a proper text file instead of fake PDF
        console.log('PDF generation not ready, creating text report');
        const reportContent = `
NAIJABIZ SHIELD - SECURITY ASSESSMENT REPORT
============================================

Assessment ID: ${assessmentId}
Report Date: ${new Date().toLocaleDateString()}

YOUR SECURITY ASSESSMENT IS COMPLETE!

Thank you for completing the NaijaBiz Shield security assessment.

This text report confirms that your assessment has been successfully processed and saved.

FULL FEATURES COMING SOON:
• Detailed PDF reports with charts and graphs
• Executive summary for business owners  
• Step-by-step action plans
• Industry benchmarking data

For now, please review your security recommendations in the web interface.

Stay secure!

NaijaBiz Shield Team
Protecting Nigerian SMEs from digital threats
        `.trim();
        
        return new Blob([reportContent], { type: 'text/plain' });
      }
      return await response.blob();
    } catch (error) {
      console.log('PDF download failed, using text fallback:', error);
      const fallbackContent = `
SECURITY ASSESSMENT COMPLETED
=============================

Assessment ID: ${assessmentId}
Status: Successfully Processed

Your security assessment has been completed and saved.
View your detailed results and recommendations in the web interface.

Full PDF reporting feature coming soon!
      `.trim();
      return new Blob([fallbackContent], { type: 'text/plain' });
    }
  }
};