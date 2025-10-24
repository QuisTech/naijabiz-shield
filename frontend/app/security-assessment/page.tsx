'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssessmentForm } from '@/components/assessment/AssessmentForm';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { AssessmentSection, AssessmentResult } from '@/types/assessment';
import { Shield, ArrowLeft } from 'lucide-react';

// Mock data - will work immediately without backend
const mockSections: AssessmentSection[] = [
  {
    id: "business_info",
    title: "Business Information", 
    description: "Tell us about your business",
    questions: [
      {
        id: "business_type",
        question: "What type of business do you operate?",
        type: "select",
        risk_weight: 10,
        options: [
          { value: "retail", label: "Retail & E-commerce" },
          { value: "service", label: "Service Business" },
          { value: "manufacturing", label: "Manufacturing" },
          { value: "tech", label: "Technology & IT" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "employee_count", 
        question: "How many employees do you have?",
        type: "select",
        risk_weight: 15,
        options: [
          { value: "1-5", label: "1-5 employees" },
          { value: "6-20", label: "6-20 employees" },
          { value: "21-50", label: "21-50 employees" },
          { value: "50+", label: "50+ employees" }
        ]
      }
    ]
  },
  {
    id: "digital_presence",
    title: "Digital Presence",
    description: "Your online footprint", 
    questions: [
      {
        id: "has_website",
        question: "Do you have a business website?",
        type: "radio",
        risk_weight: 20,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "online_payments",
        question: "Do you accept online payments?",
        type: "radio",
        risk_weight: 25,
        options: [
          { value: "yes", label: "Yes" },
          { value: "sometimes", label: "Sometimes" },
          { value: "no", label: "No" }
        ]
      }
    ]
  },
  {
    id: "security_practices",
    title: "Security Practices",
    description: "Current security measures",
    questions: [
      {
        id: "two_factor",
        question: "Do you use two-factor authentication for business accounts?",
        type: "radio",
        risk_weight: 30,
        options: [
          { value: "yes", label: "Yes, for all accounts" },
          { value: "some_accounts", label: "For some accounts" },
          { value: "no", label: "No" }
        ]
      },
      {
        id: "employee_training", 
        question: "Do you provide cybersecurity training to employees?",
        type: "radio",
        risk_weight: 20,
        options: [
          { value: "yes", label: "Yes, regularly" },
          { value: "some_trained", label: "Some employees are trained" },
          { value: "no", label: "No" }
        ]
      }
    ]
  }
];

export default function SecurityAssessmentPage() {
  const [sections, setSections] = useState<AssessmentSection[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    // Use mock data immediately - no API call needed
    setSections(mockSections);
  }, []);

  const handleSubmitAssessment = async (businessName: string, businessEmail: string, answers: any) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock results based on answers
    const riskScore = calculateMockRiskScore(answers);
    const riskLevel = getRiskLevel(riskScore);
    
    const mockResult: AssessmentResult = {
      assessment_id: Math.floor(Math.random() * 1000) + 1,
      risk_assessment: {
        risk_score: riskScore,
        risk_level: riskLevel,
        total_questions_answered: Object.keys(answers).length
      },
      recommendations: generateMockRecommendations(answers, riskLevel),
      threat_alerts: [
        {
          id: 1,
          title: "WhatsApp Business Account Hijacking",
          description: "Scammers are targeting small business WhatsApp accounts to impersonate business owners and request payments from customers.",
          severity: "high",
          category: "social_engineering",
          recommendation: "Enable two-step verification on WhatsApp and educate customers about verified business accounts."
        },
        {
          id: 2,
          title: "Fake Bank Alert Scams", 
          description: "Fraudsters are sending fake bank transfer alerts to businesses, especially for high-value transactions.",
          severity: "critical",
          category: "fraud", 
          recommendation: "Always verify transactions through your bank's official app or by calling your bank directly."
        }
      ]
    };
    
    setResult(mockResult);
    setLoading(false);
  };

  const calculateMockRiskScore = (answers: any) => {
    let score = 30; // Base score
    
    // Add risk based on answers
    if (answers.online_payments === 'yes') score += 20;
    if (answers.two_factor === 'no') score += 25;
    if (answers.has_website === 'yes') score += 15;
    if (answers.employee_training === 'no') score += 20;
    
    return Math.min(score, 95); // Cap at 95%
  };

  const getRiskLevel = (score: number) => {
    if (score < 40) return 'low';
    if (score < 70) return 'medium';
    return 'high';
  };

  const generateMockRecommendations = (answers: any, riskLevel: string) => {
    const recommendations = [];
    
    if (answers.online_payments === 'yes') {
      recommendations.push({
        priority: 'high',
        title: 'Payment Security Verification',
        description: 'Implement multi-channel verification for all online transactions to prevent fraud.',
        category: 'financial'
      });
    }
    
    if (answers.two_factor === 'no') {
      recommendations.push({
        priority: 'high', 
        title: 'Enable Two-Factor Authentication',
        description: 'Protect all business accounts (email, banking, social media) with 2FA.',
        category: 'authentication'
      });
    }
    
    // Always include these base recommendations
    recommendations.push(
      {
        priority: 'medium',
        title: 'Employee Security Training',
        description: 'Conduct basic cybersecurity awareness training for all employees.',
        category: 'education'
      },
      {
        priority: 'medium',
        title: 'Regular Data Backups', 
        description: 'Backup important business data weekly to an external drive or cloud storage.',
        category: 'data_protection'
      }
    );
    
    return recommendations;
  };

  const handleDownloadReport = async (assessmentId: number) => {
    setDownloadLoading(true);
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('In demo mode: PDF report would be generated with backend connection. Assessment completed successfully!');
    setDownloadLoading(false);
  };

  const handleRestartAssessment = () => {
    setResult(null);
    setLoading(false);
  };

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
