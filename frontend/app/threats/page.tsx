'use client'

import Link from 'next/link'
import { Shield, ArrowLeft, AlertTriangle } from 'lucide-react'

export default function Threats() {
  const currentThreats = [
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
    },
    {
      id: 3,
      title: "Phishing Email Campaigns",
      description: "Targeted phishing emails pretending to be from Nigerian banks and government agencies.",
      severity: "medium",
      category: "phishing",
      recommendation: "Verify email sender addresses and never click suspicious links. Contact institutions directly."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-300';
      case 'high': return 'bg-orange-900 text-orange-300';
      case 'medium': return 'bg-yellow-900 text-yellow-300';
      case 'low': return 'bg-green-900 text-green-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Shield className="h-8 w-8 text-blue-400" />
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

      {/* Threats Header */}
      <section className="hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-orange-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Current Threat Alerts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stay informed about the latest digital threats targeting Nigerian businesses.
          </p>
        </div>
      </section>

      {/* Threats Content */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {currentThreats.map((threat) => (
              <div key={threat.id} className="card hover:border-orange-500 transition-colors duration-200">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(threat.severity)}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                      <span className="ml-3 text-sm text-gray-400 capitalize">
                        {threat.category.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {threat.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {threat.description}
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Recommendation:</h4>
                      <p className="text-gray-300 text-sm">{threat.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Stay Protected</h3>
            <p className="text-gray-300 mb-4">
              Complete our security assessment to get personalized protection recommendations for your business.
            </p>
            <Link 
              href="/security-assessment" 
              className="btn btn-primary"
            >
              Start Security Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}