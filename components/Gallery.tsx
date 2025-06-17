// components/Gallery.tsx (クリーン版)
'use client'

import React, { useState, useEffect } from 'react'
import { Grid, Columns, Coffee, Heart, Sun, Moon, Filter } from 'lucide-react'
import Image from 'next/image'
import ImageModal from './ImageModal'

// ImageDataインターフェースを直接定義
interface ImageData {
  id: string
  title: string
  description: string
  category: string
  filepath: string
  filename: string
}

interface GalleryProps {
  category: string
  config: {
    themeColor: string
    themeIcon: string
    filters: string[]
    images: ImageData[]
  }
}

const Gallery: React.FC<GalleryProps> = ({ category, config }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid')
  const [activeFilter, setActiveFilter] = useState('すべて')
  const [isLoading, setIsLoading] = useState(true)
  
  // モーダル関連のstate
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)

  // フィルタリング済み画像
  const filteredImages = activeFilter === 'すべて' 
    ? config.images 
    : config.images.filter(img => img.category === activeFilter)

  // ローディング状態管理
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [activeFilter])

  // 画像クリック時のハンドラー
  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  // カテゴリ別テーマカラーを取得
  const getCategoryThemeColors = () => {
    const baseColors = {
      morning: {
        primary: 'bg-sunrise-orange text-white',
        primaryHover: 'hover:bg-sunrise-orange/90',
        secondary: 'bg-sunrise-orange/10 text-sunrise-orange',
        secondaryHover: 'hover:bg-sunrise-orange/20',
        badge: 'bg-sunrise-orange/20 text-sunrise-orange',
        accent: 'text-sunrise-orange',
      },
      work: {
        primary: 'bg-focus-blue text-white',
        primaryHover: 'hover:bg-focus-blue/90',
        secondary: 'bg-focus-blue/10 text-focus-blue',
        secondaryHover: 'hover:bg-focus-blue/20',
        badge: 'bg-focus-blue/20 text-focus-blue',
        accent: 'text-focus-blue',
      },
      afternoon: {
        primary: 'bg-warm-pink text-white',
        primaryHover: 'hover:bg-warm-pink/90',
        secondary: 'bg-warm-pink/10 text-warm-pink',
        secondaryHover: 'hover:bg-warm-pink/20',
        badge: 'bg-warm-pink/20 text-warm-pink',
        accent: 'text-warm-pink',
      },
      night: {
        primary: 'bg-gold text-dark-brown',
        primaryHover: 'hover:bg-gold/90',
        secondary: 'bg-gold/10 text-gold',
        secondaryHover: 'hover:bg-gold/20',
        badge: 'bg-gold/20 text-gold',
        accent: 'text-gold',
      },
    }
    
    return baseColors[category as keyof typeof baseColors] || baseColors.work
  }

  const themeColors = getCategoryThemeColors()

  // 画像カードコンポーネント
  const ImageCard: React.FC<{
    image: ImageData
    index: number
    theme: 'light' | 'dark'
    themeColors: any
    onImageClick: (image: ImageData) => void
    aspectRatio?: string
  }> = ({ image, index, theme, themeColors, onImageClick, aspectRatio }) => (
    <div 
      className="group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
      onClick={() => onImageClick(image)}
    >
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* 画像エリア */}
        <div 
          className="relative overflow-hidden"
          style={{ aspectRatio: aspectRatio || 'auto' }}
        >
          <Image
            src={image.filepath}
            alt={image.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* ホバーオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${themeColors.badge}`}>
                  {image.category}
                </span>
                <Heart 
                  className="h-5 w-5 text-white/80 hover:text-red-400 transition-colors" 
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* カード情報 */}
        <div className="p-4">
          <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
            theme === 'dark' ? 'text-white' : 'text-dark-brown'
          }`}>
            {image.title}
          </h3>
          <p className={`text-sm line-clamp-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-dark-brown/70'
          }`}>
            {image.description}
          </p>
        </div>
      </div>
    </div>
  )

  // メイソンリーグリッドコンポーネント
  const MasonryGrid: React.FC<{
    images: ImageData[]
    theme: 'light' | 'dark'
    themeColors: any
    onImageClick: (image: ImageData) => void
  }> = ({ images, theme, themeColors, onImageClick }) => {
    const [columns, setColumns] = useState(3)

    useEffect(() => {
      const updateColumns = () => {
        const width = window.innerWidth
        if (width < 768) setColumns(2)
        else if (width < 1024) setColumns(3)
        else setColumns(3)
      }

      updateColumns()
      window.addEventListener('resize', updateColumns)
      return () => window.removeEventListener('resize', updateColumns)
    }, [])

    // 画像を各列に分散
    const columnArrays = Array.from({ length: columns }, () => [] as ImageData[])
    images.forEach((image, index) => {
      columnArrays[index % columns].push(image)
    })

    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {columnArrays.map((columnImages, columnIndex) => (
          <div key={columnIndex} className="space-y-6">
            {columnImages.map((image, imageIndex) => (
              <ImageCard
                key={image.id}
                image={image}
                index={imageIndex}
                theme={theme}
                themeColors={themeColors}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  // スケルトンローディングコンポーネント
  const SkeletonCard = () => (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  )

  return (
    <>
      {/* ギャラリーセクション */}
      <section className={`pt-8 pb-20 transition-all duration-500 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* ギャラリーヘッダー */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="space-y-2">
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-dark-brown'}`}>
                  ギャラリー
                </h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-dark-brown/70'}`}>
                  {filteredImages.length} 枚の画像を表示中
                  {activeFilter !== 'すべて' && ` (${activeFilter})`}
                </p>
              </div>

              {/* コントロールボタン */}
              <div className="flex items-center space-x-4">
                {/* フィルター */}
                {config.filters.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-dark-brown/50" />
                    <select
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-600 text-white'
                          : 'bg-white border-warm-beige text-dark-brown'
                      }`}
                    >
                      <option value="すべて">すべて</option>
                      {config.filters.map((filter) => (
                        <option key={filter} value={filter}>
                          {filter}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* レイアウト切替 */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded-md transition-all ${
                      layout === 'grid'
                        ? `${themeColors.primary} ${themeColors.primaryHover}`
                        : 'text-gray-600 hover:text-dark-brown hover:bg-white'
                    }`}
                    title="グリッド表示"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setLayout('masonry')}
                    className={`p-2 rounded-md transition-all ${
                      layout === 'masonry'
                        ? `${themeColors.primary} ${themeColors.primaryHover}`
                        : 'text-gray-600 hover:text-dark-brown hover:bg-white'
                    }`}
                    title="メイソンリー表示"
                  >
                    <Columns className="h-4 w-4" />
                  </button>
                </div>

                {/* テーマ切替 */}
                <button
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className={`p-2 rounded-lg transition-all border ${
                    theme === 'dark'
                      ? 'bg-white border-gray-300 text-black hover:bg-gray-100'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                  }`}
                  title={`${theme === 'light' ? 'ダーク' : 'ライト'}モードに切替`}
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* ローディング表示 */}
            {isLoading ? (
              <div className={layout === 'masonry' ? 'grid grid-cols-2 md:grid-cols-3 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
                {[...Array(6)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : (
              <>
                {/* 画像ギャラリー */}
                {filteredImages.length > 0 ? (
                  layout === 'masonry' ? (
                    // メイソンリーレイアウト
                    <MasonryGrid
                      images={filteredImages}
                      theme={theme}
                      themeColors={themeColors}
                      onImageClick={handleImageClick}
                    />
                  ) : (
                    // グリッドレイアウト
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredImages.map((image, index) => (
                        <ImageCard
                          key={image.id}
                          image={image}
                          index={index}
                          theme={theme}
                          themeColors={themeColors}
                          onImageClick={handleImageClick}
                          aspectRatio="4/3"
                        />
                      ))}
                    </div>
                  )
                ) : (
                  /* 画像がない場合の表示 */
                  <div className="text-center py-20">
                    <Coffee className={`h-16 w-16 mx-auto mb-4 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-coffee-brown/50'
                    }`} />
                    <h3 className={`text-xl font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-dark-brown'
                    }`}>
                      {activeFilter === 'すべて' ? '画像がありません' : `"${activeFilter}" の画像がありません`}
                    </h3>
                    <p className={`text-sm mb-6 max-w-md mx-auto ${
                      theme === 'dark' ? 'text-gray-400' : 'text-dark-brown/60'
                    }`}>
                      {activeFilter === 'すべて' 
                        ? `public/images/gallery/${category}/ フォルダに画像を追加してください。`
                        : 'フィルターを変更して他のカテゴリをご覧ください。'
                      }
                    </p>
                    {activeFilter !== 'すべて' && (
                      <button
                        onClick={() => setActiveFilter('すべて')}
                        className={`px-4 py-2 rounded-lg transition-all ${themeColors.secondary} ${themeColors.secondaryHover}`}
                      >
                        すべての画像を表示
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* 画像モーダル */}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        images={filteredImages}
        onClose={handleCloseModal}
        theme={theme}
      />
    </>
  )
}

export default Gallery