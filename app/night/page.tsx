import React from 'react'
import { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { loadCategoryImages } from '@/utils/imageLoader'

export const metadata: Metadata = {
  title: '夜更けの時間 - 珈琲と机の風景',
  description: '静寂と集中の特別な時間。夜の創作活動や深い思索の瞬間をお楽しみください',
  robots: 'noindex, nofollow, noarchive, nosnippet',
}

export default function NightPage() {
  // サーバーサイドで画像を読み込み
  const galleryConfig = loadCategoryImages('night')

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="hero-section night-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* パンくずナビ */}
          <nav className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-gold/80 hover:text-gold transition-colors hero-button-glow"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">ホームに戻る</span>
            </Link>
          </nav>

          {/* ページタイトル */}
          <div className="text-center text-white space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-5xl text-gold animate-sparkle drop-shadow-lg">🌙</div>
              <h1 className="text-4xl md:text-6xl font-bold text-gold hero-text-shadow font-cursive">
                夜更けの時間
              </h1>
              <div className="text-5xl text-gold animate-sparkle drop-shadow-lg" style={{animationDelay: '0.5s'}}>✨</div>
            </div>
            <p className="text-xl md:text-3xl text-gold/90 font-light hero-text-shadow">
              静寂と集中の特別な時間
            </p>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg hero-text-shadow">
              夜の静寂に包まれた空間で過ごす、深い集中の時間。<br />
              残業や創作活動、読書など、一日の終わりの<br />
              特別な瞬間の実際の画像をお楽しみください。
            </p>
            
            {/* 画像枚数表示 */}
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              📷 {galleryConfig.images.length} 枚の画像を展示中
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <Gallery category="night" config={galleryConfig} />

      {/* 画像コレクション説明セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-brown mb-8">
            夜更けの時間の画像コレクション
          </h2>

          {/* 動的な統計情報 */}
          <div className="mb-8 p-6 bg-gold/10 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gold">
                  {galleryConfig.images.length}
                </div>
                <div className="text-sm text-dark-brown/70">総画像数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">
                  {galleryConfig.images.filter(img => img.category === '夜の照明風景').length}
                </div>
                <div className="text-sm text-dark-brown/70">夜の照明風景</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">
                  {galleryConfig.images.filter(img => img.category === '夜更けの読書').length}
                </div>
                <div className="text-sm text-dark-brown/70">夜更けの読書</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gold">
                  {galleryConfig.images.filter(img => img.category === '創作活動').length}
                </div>
                <div className="text-sm text-dark-brown/70">創作活動</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">🕯️</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                夜の照明風景
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                デスクライトや蝋燭の灯りに照らされた
                夜の作業空間。温かな光が作り出す
                神秘的な雰囲気を表現した実際の写真です。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📖</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                夜更けの読書
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                静寂な夜に文庫本や雑誌を読む風景。
                集中した読書時間の特別な雰囲気を
                撮影した実際の写真です。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🖼️</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                創作活動
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                夜の創作に没頭する様子や、芸術作品に
                囲まれた空間。インスピレーションに満ちた
                夜の時間を描いた実際の写真です。
              </p>
            </div>
          </div>

          {/* 画像追加の案内 */}
          {galleryConfig.images.length === 0 && (
            <div className="mt-12 p-8 bg-amber/10 rounded-2xl border-2 border-dashed border-amber/30">
              <div className="text-3xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-dark-brown mb-4">
                画像を追加してギャラリーを充実させましょう
              </h3>
              <p className="text-dark-brown/70 leading-relaxed mb-4">
                以下のフォルダに画像ファイルを追加すると、自動的にギャラリーに表示されます：
              </p>
              <div className="bg-dark-brown/5 p-4 rounded-lg font-mono text-sm text-left">
                <div className="text-dark-brown/80 mb-2">📂 public/images/gallery/night/</div>
                <div className="text-dark-brown/60 text-xs ml-4">
                  ├── 01_デスクライトの夜_夜の照明風景.jpg<br/>
                  ├── 02_夜読書_夜更けの読書.jpg<br/>
                  └── 03_夜の創作_創作活動.jpg
                </div>
              </div>
              <p className="text-dark-brown/60 text-sm mt-4">
                ファイル名の形式: <code className="bg-dark-brown/10 px-2 py-1 rounded text-xs">{"{連番}_{タイトル}_{カテゴリ}.{拡張子}"}</code>
              </p>
            </div>
          )}

          {/* 他の時間帯へのリンク */}
          <div className="mt-16 pt-8 border-t border-warm-beige/30">
            <h3 className="text-lg font-semibold text-dark-brown mb-6">
              他の時間帯のギャラリーも見る
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/morning" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-sunrise-orange/20 text-sunrise-orange rounded-lg hover:bg-sunrise-orange/30 transition-colors"
              >
                <span>📚</span>
                <span>モーニングタイム</span>
              </Link>
              <Link 
                href="/work" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-focus-blue/20 text-focus-blue rounded-lg hover:bg-focus-blue/30 transition-colors"
              >
                <span>✒️</span>
                <span>集中作業</span>
              </Link>
              <Link 
                href="/afternoon" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-warm-pink/20 text-warm-pink rounded-lg hover:bg-warm-pink/30 transition-colors"
              >
                <span>🍰</span>
                <span>午後のひととき</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}