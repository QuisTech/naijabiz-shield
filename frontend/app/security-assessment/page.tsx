'use client';

import { useState, useEffect } from 'react';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { AssessmentSection, AssessmentResult } from '@/types/assessment';

export default function SecurityAssessmentPage() {
  const [sections, setSections] = useState<AssessmentSection[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/questions');
      const data = await response.json();
      if (data.success) {
        setSections(data.data.sections);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // UPDATED: Accept email parameter
  const handleSubmitAssessment = async (businessName: string, businessEmail: string, answers: any) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_name: businessName,
          business_email: businessEmail, // NEW: Include email
          answers: answers
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        console.error('Assessment failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (assessmentId: number) => {
    setDownloadLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/security/report/${assessmentId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `security-report-${assessmentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading report:', error);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleRestartAssessment = () => {
    setResult(null);
    setLoading(false);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AssessmentResults
            result={result}
            onDownloadReport={handleDownloadReport}
            onRestart={handleRestartAssessment}
            downloadLoading={downloadLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.length > 0 ? (
          <AssessmentForm
            sections={sections}
            onSubmit={handleSubmitAssessment} // UPDATED: Now accepts email
            loading={loading}
          />
        ) : (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-white text-lg">Loading assessment questions...</div>
          </div>
        )}
      </div>
    </div>
  );
}