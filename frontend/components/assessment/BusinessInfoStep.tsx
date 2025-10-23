'use client';

import { useState } from 'react';
import { Building2, ArrowRight } from 'lucide-react';

interface BusinessInfoStepProps {
  onSubmit: (businessName: string, businessEmail: string) => void;
  onCancel: () => void;
}

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  onSubmit,
  onCancel
}) => {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!businessName.trim()) {
      newErrors.name = 'Business name is required';
    }

    if (!businessEmail.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(businessEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(businessName.trim(), businessEmail.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#dd020f] via-[#76127f] to-[#0c22f1] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tell us about your business
          </h1>
          <p className="text-gray-300 text-lg">
            Let's start with your business details. This helps us personalize your security assessment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name Field */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-white mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-[#d74622]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Business Email Field */}
          <div>
            <label htmlFor="businessEmail" className="block text-sm font-medium text-white mb-2">
              Business Email *
            </label>
            <input
              type="email"
              id="businessEmail"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              placeholder="Enter your business email"
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-[#d74622]'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
            <p className="mt-1 text-sm text-gray-400">
              We'll send your security assessment report to this email
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn btn-primary"
            >
              Start Assessment
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="text-center pt-4 border-t border-gray-600">
            <p className="text-xs text-gray-400">
              We respect your privacy. Your email and business information will be kept confidential 
              and used only to deliver your security assessment report.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};