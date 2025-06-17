import React from 'react'
import { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { loadCategoryImages } from '@/utils/imageLoader'

export const metadata: Metadata = {
  title: '集中作業 - 珈琲と机の風景',
  description: '生産性の高い作業時間。集中と創造性が交差する瞬間をお楽しみください',
  robots: 'noindex, nofollow, noarchive, nosnippet',
}

export default function WorkPage() {
  // サーバーサイドで画像を読み込み
  const galleryConfig = loadCategoryImages('work')

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="hero-section work-hero">
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
              <div className="text-5xl animate-pulse drop-shadow-lg">✒️</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white hero-text-shadow font-cursive">
                集中作業
              </h1>
              <div className="text-5xl animate-pulse drop-shadow-lg">📋</div>
            </div>
            <p className="text-xl md:text-3xl text-white/95 font-light hero-text-shadow">
              集中と創造性が交差する時間
            </p>
            <p className="text-white/90 max-w-2xl mx-auto leading-relaxed text-lg hero-text-shadow">
              生産性の高い作業時間。ノートPCと向き合い、<br />
              手書きメモでアイデアを整理し、チームとの議論を重ねる。<br />
              そんな創造的瞬間の実際の画像をお楽しみください。
            </p>
            
            {/* 画像枚数表示 */}
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              📷 {galleryConfig.images.length} 枚の画像を展示中
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <Gallery category="work" config={galleryConfig} />

      {/* 画像コレクション説明セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-brown mb-8">
            集中作業の画像コレクション
          </h2>

          {/* 動的な統計情報 */}
          <div className="mb-8 p-6 bg-focus-blue/10 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-focus-blue">
                  {galleryConfig.images.length}
                </div>
                <div className="text-sm text-dark-brown/70">総画像数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-focus-blue">
                  {galleryConfig.images.filter(img => img.category === 'デスクワーク風景').length}
                </div>
                <div className="text-sm text-dark-brown/70">デスクワーク風景</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-focus-blue">
                  {galleryConfig.images.filter(img => img.category === '資料作成シーン').length}
                </div>
                <div className="text-sm text-dark-brown/70">資料作成シーン</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-focus-blue">
                  {galleryConfig.images.filter(img => img.category === 'アイデア整理').length}
                </div>
                <div className="text-sm text-dark-brown/70">アイデア整理</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl">✒️</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                デスクワーク風景
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                万年筆や原稿用紙、ノートパソコンなどが
                配置された作業デスクの風景。集中して
                取り組む姿勢を撮影した実際の写真です。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📊</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                資料作成シーン
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                グラフや図表、資料が散らばる机の上。
                企画書や提案書の作成に集中する
                生産性の高い瞬間を切り取った写真です。
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">📋</div>
              <h3 className="text-xl font-semibold text-dark-brown">
                アイデア整理
              </h3>
              <p className="text-dark-brown/70 text-sm leading-relaxed">
                付箋やメモ、クリップボードを使って
                アイデアを整理する様子。創造的な
                思考プロセスを視覚化した実際の写真です。
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
                <div className="text-dark-brown/80 mb-2">📂 public/images/gallery/work/</div>
                <div className="text-dark-brown/60 text-xs ml-4">
                  ├── 01_企画書作成_デスクワーク風景.jpg<br/>
                  ├── 02_グラフ作成_資料作成シーン.jpg<br/>
                  └── 03_アイデア整理_アイデア整理.jpg
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
                href="/afternoon" 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-warm-pink/10 text-warm-pink rounded-lg hover:bg-warm-pink/20 transition-colors"
              >
                <span>🍰</span>
                <span>午後のひととき</span>
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