'use client';

import { useState } from 'react';
import { Building2, ArrowRight } from 'lucide-react';

interface BusinessInfoStepProps {
  onSubmit: (businessName: string) => void;
  onCancel: () => void;
}

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({ 
  onSubmit, 
  onCancel 
}) => {
  const [businessName, setBusinessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim()) {
      onSubmit(businessName.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card text-center">
        <div className="w-16 h-16 bg-[#d74622]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building2 className="h-8 w-8 text-[#d74622]" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Tell us about your business
        </h2>
        
        <p className="text-gray-300 mb-8">
          Let's start with your business name. This helps us personalize your security assessment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 text-left mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter your business name"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!businessName.trim()}
              className="btn-primary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};