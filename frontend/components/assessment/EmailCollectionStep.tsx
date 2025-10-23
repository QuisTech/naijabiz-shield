'use client';

import { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Shield } from 'lucide-react';

interface EmailCollectionStepProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
  loading?: boolean;
}

export const EmailCollectionStep: React.FC<EmailCollectionStepProps> = ({ 
  onSubmit, 
  onBack,
  loading = false
}) => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateEmail = async (email: string) => {
    if (!email.trim()) {
      setValidationError('Email is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    // API validation for additional checks
    try {
      setIsValidating(true);
      const response = await fetch('/api/v1/security/validate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      
      if (!result.success) {
        setValidationError(result.message);
        return false;
      }

      setValidationError('');
      return true;
    } catch (error) {
      console.error('Email validation error:', error);
      // If validation API fails, proceed with basic validation
      setValidationError('');
      return true;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateEmail(email);
    if (isValid) {
      onSubmit(email);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#d74622]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-[#d74622]" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Almost Done! Get Your Security Report
          </h2>
          
          <p className="text-gray-300 mb-2">
            Enter your email to receive your detailed security assessment report
          </p>
          <p className="text-sm text-gray-400">
            We'll send your personalized recommendations and threat analysis
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-[#1a2d44] border border-[#2d3748] rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-white mb-3 flex items-center">
            <Shield className="h-4 w-4 text-[#d74622] mr-2" />
            What you'll receive:
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#d74622] rounded-full mr-2"></div>
              Complete PDF security report
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#d74622] rounded-full mr-2"></div>
              Personalized recommendations
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#d74622] rounded-full mr-2"></div>
              Current threat alerts for Nigerian businesses
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#d74622] rounded-full mr-2"></div>
              Priority action steps
            </li>
          </ul>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your business email"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d74622] focus:border-transparent ${
                validationError 
                  ? 'border-red-500 bg-red-500/5' 
                  : 'border-gray-600'
              }`}
              required
              disabled={loading || isValidating}
            />
            {validationError && (
              <p className="text-red-400 text-sm mt-2 flex items-center">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                {validationError}
              </p>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-gray-400 text-center">
            <p>
              We respect your privacy. Your email will only be used to send your security report 
              and important updates. No spam, unsubscribe anytime.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              disabled={loading || isValidating}
              className="btn-secondary flex-1 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Questions
            </button>
            
            <button
              type="submit"
              disabled={!email.trim() || loading || isValidating}
              className="btn-primary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || isValidating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isValidating ? 'Validating...' : 'Processing...'}
                </>
              ) : (
                <>
                  Get My Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};