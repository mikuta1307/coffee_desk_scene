// components/DemoBanner.tsx
'use client'
import { useState, useEffect } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // ローカルストレージから表示状態を確認（架空サイトなのでセッション内のみ）
    const isDismissed = sessionStorage.getItem('demo-banner-dismissed')
    if (!isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('demo-banner-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div 
      className="relative text-white shadow-lg z-50"
      style={{
        background: 'linear-gradient(90deg, #F59E0B 0%, #EA580C 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle 
              className="h-5 w-5 flex-shrink-0" 
              style={{ color: '#FEF3C7' }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                <span className="font-bold">⚠️ デモサイト</span>
                <span className="hidden sm:inline">
                  {" "}- このサイトは架空のギャラリーサイトです。画像はすべてAI生成によるデモ用コンテンツです。
                </span>
                <span className="sm:hidden">
                  {" "}- 架空サイト（AI生成画像使用）
                </span>
              </p>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-4 p-1 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            }}
            aria-label="バナーを閉じる"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      
      {/* 装飾的なボーダー */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #D97706 0%, #C2410C 100%)'
        }}
      ></div>
    </div>
  )
}