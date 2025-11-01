'use client'

import Link from 'next/link'
import { Shield, AlertTriangle, FileText, TrendingUp, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation - White Theme */}
      <nav className="bg-dark shadow-sm border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/security-assessment" className="nav-link">
                Security Assessment
              </Link>
              <Link href="/threats" className="nav-link">
                Threat Alerts
              </Link>
              <Link 
                href="/security-assessment" 
                className="btn btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - With Background Color */}
      <section className="bg-gradient-to-br from-dark-light to-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-bold">
              Protect Your Nigerian Business from{" "} 
              <span className="text-primary-500 font-bold">Digital Threats</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 font-medium max-w-3xl mx-auto">
              NaijaBiz Shield helps Nigerian SMEs identify security risks, get personalized recommendations, 
              and build resilience against cyber attacks tailored to our local context.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/security-assessment" 
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center"
              >
                Start Security Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/threats" 
                className="btn btn-secondary text-lg px-8 py-3"
              >
                View Current Threats
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - With Background Color */}
      <section className="py-16 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How NaijaBiz Shield Protects Your Business
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl font-normal mx-auto">
              Our platform is specifically designed for Nigerian SMEs facing unique digital challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-[#d74622]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-[#d74622]" />
              </div>
              <h3 className="text-xl font-semibold text-white font-normal mb-2">Security Assessment</h3>
              <p className="text-gray-100">
                Complete a 10-minute assessment to identify your business's specific security vulnerabilities.
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-white font-normal mb-2">Threat Intelligence</h3>
              <p className="text-gray-100">
                Stay updated on the latest digital threats targeting Nigerian businesses.
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-white font-normal mb-2">Actionable Insights</h3>
              <p className="text-gray-100">
                Get personalized recommendations and step-by-step guidance to improve your security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - With Your Gradient */}
      <section className="py-16 bg-gradient-to-r from-[#dd020f] via-[#76127f] to-[#0c22f1] text-white font-normal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of Nigerian SMEs who have already protected their businesses with our free assessment.
          </p>
          <Link 
            href="/security-assessment" 
            className="btn bg-dark text-white font-normal hover:bg-gray-700 text-lg px-8 py-3 inline-block"
          >
            Start Free Assessment
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white font-normal py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-[#d74622]" />
              <span className="ml-2 text-lg font-semibold">NaijaBiz Shield</span>
            </div>
            <div className="text-gray-100">
              &copy; 2024 InspireNova Enterprises. Built for Nigerian SMEs.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}