'use client';

import { useState, useEffect } from 'react';
import { AssessmentSection, AssessmentAnswers } from '@/types/assessment';
import { QuestionStep } from './QuestionStep';
import { BusinessInfoStep } from './BusinessInfoStep';

interface AssessmentFormProps {
  sections: AssessmentSection[];
  onSubmit: (businessName: string, businessEmail: string, answers: AssessmentAnswers) => void;
  loading: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ 
  sections, 
  onSubmit, 
  loading 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showBusinessInfo, setShowBusinessInfo] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const allQuestions = sections.flatMap(section => section.questions);
  const totalSteps = allQuestions.length + 1;

  // Auto-save progress
  const autoSaveProgress = (currentAnswers: AssessmentAnswers) => {
    localStorage.setItem('assessment_progress', JSON.stringify({
      businessName,
      businessEmail, 
      answers: currentAnswers,
      timestamp: Date.now()
    }));
  };

  // Save progress when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setHasUnsavedChanges(true);
      autoSaveProgress(answers);
    }
  }, [answers, businessName, businessEmail]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved assessment progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle business info submission
  const handleBusinessInfoSubmit = (name: string, email: string) => {
    setBusinessName(name);
    setBusinessEmail(email);
    setShowBusinessInfo(false);
    setCurrentStep(1);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Use the new submit function with error handling
      handleSubmitAssessment(businessName, businessEmail, answers);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setShowBusinessInfo(true);
      setCurrentStep(0);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // NEW: Enhanced submit function with error handling
  const handleSubmitAssessment = async (name: string, email: string, assessmentAnswers: AssessmentAnswers) => {
    try {
      const data = {
        business_name: name,
        business_email: email,
        answers: assessmentAnswers
      };

      const response = await fetch('https://naijabiz-shield.onrender.com/api/v1/security/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.status}`);
      }
      
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.detail || 'Submission failed');
      }
      
      // Clear saved progress on success
      localStorage.removeItem('assessment_progress');
      setHasUnsavedChanges(false);
      
      // Success - pass data to parent component
      onSubmit(name, email, assessmentAnswers);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to save your assessment. Please try again. Your progress has been saved locally.');
      
      // Save to localStorage as backup
      localStorage.setItem('pending_assessment', JSON.stringify({
        businessName: name,
        businessEmail: email,
        answers: assessmentAnswers,
        timestamp: Date.now(),
        error: true
      }));
    }
  };

  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  if (showBusinessInfo) {
    return (
      <BusinessInfoStep
        onSubmit={handleBusinessInfoSubmit}
        onCancel={() => window.history.back()}
      />
    );
  }

  const currentQuestion = allQuestions[currentStep - 1];
  const currentSection = sections.find(section => 
    section.questions.includes(currentQuestion)
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white mb-2">
          <span>Progress</span>
          <span>{currentStep} of {totalSteps - 1}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#dd020f] via-[#76127f] to-[#0c22f1] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <QuestionStep
        section={currentSection!}
        question={currentQuestion}
        answer={answers[currentQuestion.id] || ''}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
        isLast={currentStep === totalSteps - 1}
        loading={loading}
        currentStep={currentStep - 1}
        totalSteps={totalSteps - 1}
      />
    </div>
  );
};