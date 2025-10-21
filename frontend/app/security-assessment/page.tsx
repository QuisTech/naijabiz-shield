'use client'

import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function SecurityAssessment() {
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

      {/* Assessment Header */}
      <section className="hero-gradient py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Security Assessment
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete this 10-minute assessment to identify your business's security risks and get personalized recommendations.
          </p>
        </div>
      </section>

      {/* Assessment Content */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Assessment Coming Soon
              </h2>
              <p className="text-gray-300">
                We're building the interactive security assessment. Check back soon to analyze your business's digital security.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">What to Expect</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Business profile analysis</li>
                  <li>• Digital presence assessment</li>
                  <li>• Security practices evaluation</li>
                  <li>• Personalized risk score</li>
                </ul>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">You'll Receive</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Detailed PDF report</li>
                  <li>• Actionable recommendations</li>
                  <li>• Threat alerts for Nigeria</li>
                  <li>• Step-by-step guidance</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/" 
                className="btn btn-primary"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}