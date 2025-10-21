'use client';

import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAssessment } from '@/hooks/use-assessment';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';

export default function SecurityAssessment() {
  const { 
    questions, 
    loading, 
    error, 
    result, 
    submitAssessment, 
    downloadReport, 
    resetAssessment 
  } = useAssessment();

  const handleSubmitAssessment = async (businessName: string, answers: any) => {
    await submitAssessment(businessName, answers);
  };

  const handleDownloadReport = async (assessmentId: number) => {
    await downloadReport(assessmentId);
  };

  const handleRestart = () => {
    resetAssessment();
  };

  if (error && !questions) {
    return (
      <div className="min-h-screen bg-dark">
        <nav className="bg-dark-light shadow-sm border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Shield className="h-8 w-8 text-[#d74622]" />
                  <span className="ml-2 text-xl font-bold text-white">NaijaBiz Shield</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto py-16 px-4 text-center">
          <div className="card">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Assessment</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn-secondary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <button onClick={() => window.location.reload()} className="btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation */}
      <nav className="bg-dark-light shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Shield className="h-8 w-8 text-[#d74622]" />
                <span className="ml-2 text-xl font-bold text-white">NaijaBiz Shield</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="nav-link flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {result ? (
            <AssessmentResults
              result={result}
              onDownloadReport={handleDownloadReport}
              onRestart={handleRestart}
              downloadLoading={loading}
            />
          ) : questions ? (
            <AssessmentForm
              sections={questions.sections}
              onSubmit={handleSubmitAssessment}
              loading={loading}
            />
          ) : (
            <div className="max-w-2xl mx-auto text-center">
              <div className="card">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d74622] mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-white mb-2">Loading Assessment</h2>
                <p className="text-gray-300">Preparing your security questions...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}