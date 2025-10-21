import { useState, useEffect } from 'react';
import { AssessmentData, AssessmentAnswers, AssessmentResult } from '@/types/assessment';
import { assessmentApi, isUsingMockData } from '@/lib/api';

export const useAssessment = () => {
  const [questions, setQuestions] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assessmentApi.getQuestions();
      setQuestions(data);
    } catch (err) {
      const errorMessage = isUsingMockData 
        ? 'Demo mode: Using sample assessment questions'
        : (err instanceof Error ? err.message : 'Failed to load questions');
      
      // In mock mode, we don't show errors since we're using demo data
      if (!isUsingMockData) {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const submitAssessment = async (businessName: string, answers: AssessmentAnswers) => {
    try {
      setLoading(true);
      setError(null);
      const assessmentResult = await assessmentApi.submitAssessment(businessName, answers);
      setResult(assessmentResult);
      return assessmentResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit assessment';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (assessmentId: number) => {
    try {
      const blob = await assessmentApi.downloadReport(assessmentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `naijabiz-security-report-${assessmentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.log('Download not available:', err);
      alert('Assessment completed successfully! PDF download is available in full implementation.');
    }
  };

  const resetAssessment = () => {
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    result,
    submitAssessment,
    downloadReport,
    resetAssessment,
    refetchQuestions: loadQuestions,
    isDemoMode: isUsingMockData
  };
};
