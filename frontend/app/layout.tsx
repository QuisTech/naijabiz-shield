import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
    <html lang="en"> {/* Remove className="dark" */}
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}