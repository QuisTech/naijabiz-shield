'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { AssessmentSection, AssessmentResult } from '@/types/assessment';
import { Shield, ArrowLeft } from 'lucide-react';

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
          business_email: businessEmail,
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

  // Navigation Header Component
  const NavigationHeader = () => (
    <nav className="bg-gray-800 shadow-xl border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">NaijaBiz Shield</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="nav-link flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <Link href="/threats" className="nav-link">
              Threat Alerts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  if (result) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationHeader />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AssessmentResults
              result={result}
              onDownloadReport={handleDownloadReport}
              onRestart={handleRestartAssessment}
              downloadLoading={downloadLoading}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavigationHeader />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.length > 0 ? (
            <AssessmentForm
              sections={sections}
              onSubmit={handleSubmitAssessment}
              loading={loading}
            />
          ) : (
            <div className="flex justify-center items-center min-h-64">
              <div className="text-white text-lg">Loading assessment questions...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}