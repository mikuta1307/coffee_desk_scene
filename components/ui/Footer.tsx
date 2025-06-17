// components/ui/Footer.tsx
import Link from 'next/link'
import { Coffee, Github, Twitter, Instagram, AlertTriangle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-cream mt-auto">
      {/* デモサイト注意書きバナー */}
      <div className="bg-amber/90 text-dark-brown py-3 border-b border-amber/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <p className="text-center font-medium">
            <strong>【デモサイト】</strong> このサイトは架空のギャラリーサイトです。画像はAI生成によるもので、実際のサービスや商品販売は行っておりません。
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴとサイト説明 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-6 w-6 text-amber" />
              <span className="font-cursive text-xl font-bold">珈琲と机の風景</span>
            </div>
            <p className="text-warm-beige text-sm leading-relaxed">
              日常に息づく、静かな時間の記録<br />
              AI生成による架空の画像ギャラリーサイト
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-warm-beige/20 rounded-full flex items-center justify-center opacity-50">
                <Github className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-warm-beige/20 rounded-full flex items-center justify-center opacity-50">
                <Twitter className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-warm-beige/20 rounded-full flex items-center justify-center opacity-50">
                <Instagram className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* ナビゲーションリンク */}
          <div className="space-y-4">
            <h3 className="font-semibold text-amber">時間帯別ギャラリー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/morning" className="text-warm-beige hover:text-amber transition-colors">
                  📚 モーニングタイム
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-warm-beige hover:text-amber transition-colors">
                  ✒️ 集中作業
                </Link>
              </li>
              <li>
                <Link href="/afternoon" className="text-warm-beige hover:text-amber transition-colors">
                  🍰 午後のひととき
                </Link>
              </li>
              <li>
                <Link href="/night" className="text-warm-beige hover:text-amber transition-colors">
                  🌙 夜更けの時間
                </Link>
              </li>
            </ul>
          </div>

          {/* お問合せと重要な注意事項 */}
          <div className="space-y-4">
            <h3 className="font-semibold text-amber">サイト情報</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-warm-beige hover:text-amber transition-colors">
                  お問合せ（デモ用）
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 p-3 bg-amber/10 border border-amber/20 rounded-lg">
              <h4 className="font-semibold text-amber text-xs mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                重要な注意事項
              </h4>
              <ul className="space-y-1 text-warm-beige/80 text-xs">
                <li>• 架空のデモサイトです</li>
                <li>• 画像はすべてAI生成です</li>
                <li>• 商用利用はできません</li>
                <li>• お問合せフォームは機能しません</li>
                <li>• 実際のサービス提供はありません</li>
              </ul>
            </div>
          </div>
        </div>

        {/* コピーライトとデモサイト表記 */}
        <div className="border-t border-warm-beige/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-warm-beige text-sm">
              © 2025 珈琲と机の風景
            </p>
            <div className="hidden md:block w-1 h-1 bg-warm-beige/50 rounded-full"></div>
            <p className="text-warm-beige/70 text-xs">
              AI Generated Images Gallery - Demo Site
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-warm-beige/50">
            <span>Built with</span>
            <span className="text-amber">Next.js</span>
            <span>+</span>
            <span className="text-amber">Tailwind CSS</span>
          </div>
        </div>
      </div>

      {/* 装飾的な珈琲豆 */}
      <div className="relative overflow-hidden h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/20 to-transparent"></div>
      </div>
    </footer>
  )
}