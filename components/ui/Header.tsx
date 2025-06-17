// components/ui/Header.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Coffee } from 'lucide-react'

const navItems = [
  { href: '/morning', label: 'モーニングタイム', icon: '📚' },
  { href: '/work', label: '集中作業', icon: '✒️' },
  { href: '/afternoon', label: '午後のひととき', icon: '🍰' },
  { href: '/night', label: '夜更けの時間', icon: '🌙' },
  { href: '/contact', label: 'お問合せ', icon: '📝' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-warm-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-coffee-brown hover:text-coffee-brown/80 transition-colors"
          >
            <Coffee className="h-8 w-8" />
            <span className="font-cursive text-2xl font-bold">珈琲と机の風景</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-warm-beige/20 ${
                  pathname === item.href
                    ? 'text-coffee-brown bg-warm-beige/30'
                    : 'text-dark-brown hover:text-coffee-brown'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 rounded-md text-dark-brown hover:text-coffee-brown hover:bg-warm-beige/20 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-warm-beige/30 animate-slide-up">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'text-coffee-brown bg-warm-beige/30'
                    : 'text-dark-brown hover:text-coffee-brown hover:bg-warm-beige/20'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}