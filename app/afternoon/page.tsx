import React from 'react'
import { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { loadCategoryImages } from '@/utils/imageLoader'

export const metadata: Metadata = {
  title: '午後のひととき - 珈琲と机の風景',
  description: '温かな午後の光に包まれた、リラックスした時間の風景',
  robots: 'noindex, nofollow, noarchive, nosnippet',
}

export default function AfternoonPage() {
  // サーバーサイドで画像を読み込み
  const galleryConfig = loadCategoryImages('afternoon')

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="hero-section afternoon-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors hero-button-glow"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">ホームに戻る</span>
            </Link>
          </nav>

          <div className="text-center text-white space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-5xl animate-pulse drop-shadow-lg">🍰</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white hero-text-shadow font-cursive">
                午後のひととき
              </h1>
              <div className="text-5xl animate-steam drop-shadow-lg">🫖</div>
            </div>
            <p className="text-xl md:text-3xl text-white/95 font-light hero-text-shadow">
              温かな午後の光に包まれて
            </p>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed text-lg hero-text-shadow">
              午後の柔らかな光が差し込む空間で過ごす、リラックスした時間。<br />
              友人との会話、読書、そして特別なスイーツタイムの<br />
              実際の画像ギャラリーをお楽しみください。
            </p>
            
            {/* 画像枚数表示 */}
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              📷 {galleryConfig.images.length} 枚の画像を展示中
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <Gallery category="afternoon" config={galleryConfig} />

      {/* 画像コレクション説明セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-brown mb-8">
            午後のひとときの画像コレクション
          </h2>

          {/* 動的な統計情報 */}
          <div className="mb-8 p-6 bg-warm-pink/10 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-warm-pink">
                  {galleryConfig.images.length}
                </div>
                <div className="text-sm text-dark-brown/70">総画像数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warm-pink">
                  {galleryConfig.images.filter(img => img.category === 'ティータイム風景').length}
                </div>
                <div className="text-sm text-dark-brown/70">ティータイム風景</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warm-pink">
                  {galleryConfig.images.filter(img => img.category === 'カフェの雰囲気').length}
                </div>
                <div className="text-sm text-dark-brown/70">カフェの雰囲気</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warm-pink">
                  {galleryConfig.images.filter(img => img.category === '読書とくつろぎ').length}
                </div>
                <div className="text-sm text-dark-brown/70">読書とくつろぎ</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">🍰</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                ティータイム風景
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                ケーキやお菓子、ティーカップが美しく
                配置されたテーブル風景。午後の優雅な
                ひとときを表現した実際の写真です。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🫖</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                カフェの雰囲気
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                ティーポットや珈琲器具に囲まれた
                温かな空間。リラックスした午後の
                カフェタイムを撮影した写真コレクションです。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📖</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                読書とくつろぎ
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                雑誌や本を読みながら過ごす午後の時間。
                柔らかな光の中でのんびりと過ごす
                リラックスした瞬間の実際の写真です。
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
                <div className="text-dark-brown/80 mb-2">📂 public/images/gallery/afternoon/</div>
                <div className="text-dark-brown/60 text-xs ml-4">
                  ├── 01_アフタヌーンティー_ティータイム風景.jpg<br/>
                  ├── 02_カフェでくつろぐ_カフェの雰囲気.jpg<br/>
                  └── 03_雑誌を読む_読書とくつろぎ.jpg
                </div>
              </div>
              <p className="text-dark-brown/60 text-sm mt-4">
                ファイル名の形式: <code className="bg-dark-brown/10 px-2 py-1 rounded text-xs">{"{連番}_{タイトル}_{カテゴリ}.{拡張子}"}</code>
              </p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-warm-beige/30">
            <h3 className="text-lg font-semibold text-dark-brown mb-6">
              他の時間帯のギャラリーも見る
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/morning" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-sunrise-orange/10 text-sunrise-orange rounded-lg hover:bg-sunrise-orange/20 transition-colors"
              >
                <span>📚</span>
                <span>モーニングタイム</span>
              </Link>
              <Link 
                href="/work" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-focus-blue/10 text-focus-blue rounded-lg hover:bg-focus-blue/20 transition-colors"
              >
                <span>✒️</span>
                <span>集中作業</span>
              </Link>
              <Link 
                href="/night" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
              >
                <span>🌙</span>
                <span>夜更けの時間</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}