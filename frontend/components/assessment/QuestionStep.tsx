'use client';

import { AssessmentSection, AssessmentQuestion } from '@/types/assessment';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

interface QuestionStepProps {
  section: AssessmentSection;
  question: AssessmentQuestion;
  answer: string;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
  loading: boolean;
  currentStep: number;
  totalSteps: number;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  section,
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  isLast,
  loading,
  currentStep,
  totalSteps
}) => {
  const handleOptionSelect = (value: string) => {
    onAnswer(question.id, value);
  };

  const handleNext = () => {
    if (answer && !loading) {
      onNext();
    }
  };

  const canProceed = answer && !loading;

  return (
    <div className="card">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#d74622] font-medium mb-2">
          <Shield className="h-4 w-4" />
          <span>{section.title}</span>
        </div>
        <div className="text-xs text-gray-400">
          Question {currentStep + 1} of {totalSteps}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl font-semibold text-white mb-8">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.type === 'radio' && question.options?.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              answer === option.value
                ? 'border-[#d74622] bg-[#d74622]/5 text-[#d74622]'
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              {answer === option.value && (
                <div className="w-6 h-6 bg-[#d74622] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2  rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        ))}

        {question.type === 'select' && question.options?.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              answer === option.value
                ? 'border-[#d74622] bg-[#d74622]/5 text-[#d74622]'
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
            }`}
          >
            <span className="font-medium">{option.label}</span>
          </button>
        ))}

        {question.type === 'text' && (
          <textarea
            value={answer}
            onChange={(e) => handleOptionSelect(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#d74622] focus:border-transparent resize-none"
            rows={4}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-600">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center"
          disabled={loading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              {isLast ? 'Get Results' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};