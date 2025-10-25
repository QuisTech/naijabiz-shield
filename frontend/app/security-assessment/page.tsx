'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { AssessmentSection, AssessmentResult } from '@/types/assessment';
import { Shield, ArrowLeft } from 'lucide-react';

// Get the API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function SecurityAssessmentPage() {
  const [sections, setSections] = useState<AssessmentSection[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/security/questions`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setSections(data.data.sections);
      } else {
        throw new Error(data.detail || 'Failed to load questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load assessment questions. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssessment = async (businessName: string, businessEmail: string, answers: any) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/security/assess`, {
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

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        throw new Error(data.detail || 'Assessment failed');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (assessmentId: number) => {
    setDownloadLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/security/report/${assessmentId}`);
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
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to download report');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      setError('Failed to download report. Please try again.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleRestartAssessment = () => {
    setResult(null);
    setLoading(false);
    setError('');
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

  // Show loading state
  if (loading && sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationHeader />
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d74622] mx-auto mb-4"></div>
            <div className="text-white text-lg">Loading assessment questions...</div>
            <div className="text-gray-400 text-sm mt-2">Connecting to security service</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationHeader />
        <div className="flex justify-center items-center min-h-64">
          <div className="card text-center max-w-md">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-white mb-2">Connection Issue</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <div className="space-y-3">
              <button 
                onClick={fetchQuestions}
                className="w-full btn btn-primary"
              >
                Retry
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full btn btn-secondary"
              >
                Return Home
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Backend: {API_BASE_URL}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavigationHeader />
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}
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
          {error && (
            <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          <AssessmentForm
            sections={sections}
            onSubmit={handleSubmitAssessment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}