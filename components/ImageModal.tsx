// components/ImageModal.tsx (修正版)
'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Download, Heart, ZoomIn, ZoomOut } from 'lucide-react'
import Image from 'next/image'

interface ImageData {
  id: string
  title: string
  description: string
  category: string
  filepath: string
  filename: string
}

interface ImageModalProps {
  isOpen: boolean
  image: ImageData | null
  images: ImageData[]
  onClose: () => void
  theme: 'light' | 'dark'
}

export default function ImageModal({ isOpen, image, images, onClose, theme }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // 現在の画像インデックスを更新
  useEffect(() => {
    if (image && images.length > 0) {
      const index = images.findIndex(img => img.id === image.id)
      setCurrentIndex(index >= 0 ? index : 0)
      setIsLoading(true)
      setIsZoomed(false)
    }
  }, [image, images])

  // 現在の画像を取得
  const currentImage = images[currentIndex] || image

  // スクロールロック - 重要な修正
  useEffect(() => {
    if (isOpen) {
      // より確実なスクロールロック
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // ナビゲーション関数
  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setCurrentIndex(newIndex)
    setIsLoading(true)
    setIsZoomed(false)
  }, [currentIndex, images.length])

  const goToNext = useCallback(() => {
    if (images.length <= 1) return
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setIsLoading(true)
    setIsZoomed(false)
  }, [currentIndex, images.length])

  const toggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev)
  }, [])

  const toggleFavorite = useCallback(() => {
    setIsFavorited(prev => !prev)
  }, [])

  const handleDownload = useCallback(() => {
    if (!currentImage) return
    
    try {
      const link = document.createElement('a')
      link.href = currentImage.filepath
      link.download = `${currentImage.title}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }, [currentImage])

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          goToNext()
          break
        case ' ':
          e.preventDefault()
          toggleZoom()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFavorite()
          break
        case 'd':
        case 'D':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            handleDownload()
          }
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      modalRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, goToPrevious, goToNext, toggleZoom, toggleFavorite, handleDownload, onClose])

  // コントロール自動非表示
  useEffect(() => {
    if (!isOpen) return

    let timeout: NodeJS.Timeout
    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)
      timeout = setTimeout(() => setShowControls(false), 3000)
    }

    const handleMouseMove = () => resetTimeout()
    
    resetTimeout()
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // レスポンシブな画像サイズ計算
  const getImageContainerStyle = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const headerHeight = isMobile ? 70 : 80 // ヘッダーの実際の高さ
    const footerHeight = isMobile ? 70 : 80 // フッターの実際の高さ
    const totalReservedHeight = headerHeight + footerHeight
    const sideMargin = isMobile ? 10 : 20
    
    return {
      padding: `${headerHeight}px ${sideMargin}px ${footerHeight}px ${sideMargin}px`,
      maxHeight: `calc(100vh - ${totalReservedHeight}px)`,
    }
  }

  // 表示条件
  if (!isOpen || !currentImage) {
    return null
  }

  const containerStyle = getImageContainerStyle()

  return (
    <div
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 999999, // 究極デバッグ版と同じ高いz-index
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      tabIndex={-1}
    >
      {/* メイン画像エリア */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px', // 上下のパディングを大幅に削減
        }}
      >
        {/* 画像コンテナ */}
        <div 
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh', // より大きな表示エリア
            width: 'auto',
            height: 'auto',
            transition: 'transform 0.3s ease-out',
            transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            cursor: isZoomed ? 'zoom-out' : 'zoom-in',
            overflow: isZoomed ? 'visible' : 'hidden',
          }}
          onClick={toggleZoom}
        >
          <Image
            src={currentImage.filepath}
            alt={currentImage.title}
            width={1200}
            height={800}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
              maxWidth: '90vw',
              maxHeight: '90vh', // より大きな画像表示
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            priority
            sizes="90vw"
          />
          
          {/* ローディング表示 */}
          {isLoading && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '8px',
              }}
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          )}
        </div>

        {/* ナビゲーションボタン */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: showControls ? 1 : 0,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              aria-label="前の画像"
              title="前の画像 (← または ↑)"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: showControls ? 1 : 0,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              aria-label="次の画像"
              title="次の画像 (→ または ↓)"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* ヘッダーコントロール */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '20px 24px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 70%, transparent 100%)',
          transition: 'opacity 0.2s ease',
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none', // コントロール非表示時はクリックを通す
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {/* 画像情報 */}
          <div style={{ flex: 1, marginRight: '16px', color: 'white' }}>
            <h2 
              id="modal-title" 
              style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'white',
              }}
            >
              {currentImage.title}
            </h2>
            <p 
              id="modal-description" 
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                lineHeight: '1.5',
                marginBottom: '12px',
              }}
            >
              {currentImage.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              <span 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {currentImage.category}
              </span>
              {images.length > 1 && (
                <span>
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>
          </div>

          {/* 閉じるボタン */}
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(4px)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}
            aria-label="モーダルを閉じる"
            title="閉じる (Esc)"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* フッターコントロール */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 24px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 70%, transparent 100%)',
          transition: 'opacity 0.2s ease',
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none', // コントロール非表示時はクリックを通す
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* アクションボタン */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleZoom}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              aria-label={isZoomed ? 'ズームアウト' : 'ズームイン'}
              title={`${isZoomed ? 'ズームアウト' : 'ズームイン'} (スペース)`}
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>

            <button
              onClick={toggleFavorite}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: isFavorited ? '#ef4444' : 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isFavorited ? '#dc2626' : 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isFavorited ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'
              }}
              aria-label={isFavorited ? 'お気に入りから削除' : 'お気に入りに追加'}
              title={`${isFavorited ? 'お気に入りから削除' : 'お気に入りに追加'} (F)`}
            >
              <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleDownload}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
              }}
              aria-label="画像をダウンロード"
              title="ダウンロード (Ctrl+D)"
            >
              <Download size={20} />
            </button>
          </div>

          {/* キーボードショートカットヒント */}
          <div 
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 12px',
              borderRadius: '8px',
              display: 'none', // モバイルでは非表示にできる
            }}
            className="hidden md:block"
          >
            <div style={{ color: 'white', fontSize: '12px', display: 'flex', gap: '16px' }}>
              <span>← → 前後</span>
              <span>Space ズーム</span>
              <span>F ♥</span>
              <span>Esc 閉じる</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}