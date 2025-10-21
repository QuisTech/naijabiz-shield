'use client';

import { useState } from 'react';
import { AssessmentSection, AssessmentAnswers } from '@/types/assessment';
import { QuestionStep } from './QuestionStep';
import { BusinessInfoStep } from './BusinessInfoStep';

interface AssessmentFormProps {
  sections: AssessmentSection[];
  onSubmit: (businessName: string, answers: AssessmentAnswers) => void;
  loading: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ 
  sections, 
  onSubmit, 
  loading 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showBusinessInfo, setShowBusinessInfo] = useState(true);

  const allQuestions = sections.flatMap(section => section.questions);
  const totalSteps = allQuestions.length + 1; // +1 for business info

  const handleBusinessInfoSubmit = (name: string) => {
    setBusinessName(name);
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
      onSubmit(businessName, answers);
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