import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NaijaBiz Shield - Nigerian SME Digital Resilience Platform',
  description: 'Protect your Nigerian business from digital threats with our comprehensive security assessment and tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global Header - WITH PROPER NAVIGATION */}
        <header className="bg-gradient-to-r from-primary-500 to-accent-purple text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Logo Section - CLICKABLE TO HOME */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h1 className="text-2xl font-bold">NaijaBiz Shield</h1>
                  <div className="text-sm opacity-90">Digital Armor for Nigerian SMEs</div>
                </div>
              </Link>
              
              {/* Navigation - WITH PROPER LINKS */}
              <nav>
                <ul className="flex flex-wrap justify-center gap-6">
                  <li><Link href="/#features" className="text-white hover:text-gray-200 font-medium transition-colors">Features</Link></li>
                  <li><Link href="/#modules" className="text-white hover:text-gray-200 font-medium transition-colors">Modules</Link></li>
                  <li><Link href="/#about" className="text-white hover:text-gray-200 font-medium transition-colors">About</Link></li>
                  <li><Link href="/#contact" className="text-white hover:text-gray-200 font-medium transition-colors">Contact</Link></li>
                </ul>
              </nav>
              
              {/* Auth Buttons - WITH PROPER LINKS */}
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-primary-500 transition-colors">
                  Login
                </button>
                <Link href="/security-assessment" className="px-4 py-2 bg-white text-primary-500 rounded hover:bg-gray-100 transition-colors font-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
