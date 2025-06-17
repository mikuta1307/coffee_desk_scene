import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import DemoBanner from '@/components/DemoBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '珈琲と机の風景 - AI Generated Gallery',
  description: '日常に息づく、静かな時間の記録 - デモサイト',
  robots: 'noindex, nofollow, noarchive, nosnippet',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} text-dark-brown min-h-screen flex flex-col`}>
        <DemoBanner />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}