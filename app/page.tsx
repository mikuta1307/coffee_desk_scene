// app/page.tsx
import Link from 'next/link'
import { Coffee, ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 'morning',
    title: 'モーニングタイム',
    subtitle: '朝の静寂と希望',
    description: '新しい一日の始まりと共に',
    icon: '📚', // 修正: 🌅 → 📚
    gradient: 'bg-morning-gradient',
    textGradient: 'text-gradient-morning',
    href: '/morning',
  },
  {
    id: 'work',
    title: '集中作業',
    subtitle: '集中と創造性',
    description: '生産性の高い瞬間を切り取って',
    icon: '✒️', // 修正: 💻 → ✒️
    gradient: 'bg-work-gradient',
    textGradient: 'text-gradient-work',
    href: '/work',
  },
  {
    id: 'afternoon',
    title: '午後のひととき',
    subtitle: '温かな休息',
    description: 'ほっと一息つける時間',
    icon: '🍰', // 修正: 🫖 → 🍰
    gradient: 'bg-afternoon-gradient',
    textGradient: 'text-gradient-afternoon',
    href: '/afternoon',
  },
  {
    id: 'night',
    title: '夜更けの時間',
    subtitle: '静寂と内省',
    description: '一日の終わりの特別な時間',
    icon: '🌙', // そのまま
    gradient: 'bg-night-gradient',
    textGradient: 'text-gradient-night',
    href: '/night',
  },
]

const featuredImages = [
  {
    title: '朝の読書時間',
    category: 'モーニング',
    badge: 'morning',
    time: '07:30',
  },
  {
    title: '集中する午後',
    category: '作業',
    badge: 'work',
    time: '14:15',
  },
  {
    title: '夜カフェの灯り',
    category: '夜更け',
    badge: 'night',
    time: '22:45',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-warm-beige/30 to-cream overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-5">
          <div className="coffee-beans"></div>
        </div>
        
        {/* 浮遊する珈琲豆装飾 */}
        <div className="absolute top-20 left-10 text-6xl text-coffee-brown/10 animate-steam">☕</div>
        <div className="absolute bottom-32 right-16 text-4xl text-coffee-brown/10 animate-steam" style={{animationDelay: '1s'}}>☕</div>
        <div className="absolute top-1/3 right-20 text-5xl text-coffee-brown/10 animate-steam" style={{animationDelay: '2s'}}>☕</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* メインタイトル */}
          <div className="space-y-6 mb-16">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Coffee className="h-12 w-12 text-coffee-brown animate-steam" />
              <h1 className="font-cursive text-responsive-xl font-bold text-dark-brown">
                珈琲と机の風景
              </h1>
              <Coffee className="h-12 w-12 text-coffee-brown animate-steam" style={{animationDelay: '1.5s'}} />
            </div>
            <p className="text-responsive-lg text-dark-brown/80 max-w-2xl mx-auto leading-relaxed">
              日常に息づく、静かな時間の記録
            </p>
            <p className="text-sm text-dark-brown/60 max-w-xl mx-auto">
              時間帯ごとに異なる表情を見せる、珈琲と机のある風景をお楽しみください
            </p>
            <div className="inline-block px-4 py-2 bg-amber/20 text-amber-800 rounded-full text-sm font-medium">
              ✨ AI Generated Gallery - Demo Site
            </div>
          </div>

          {/* カテゴリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`${category.gradient} h-64 md:h-80 flex flex-col justify-end p-8 relative`}>
                  {/* カテゴリーアイコン */}
                  <div className="absolute top-6 right-6 text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  
                  {/* グラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                  
                  {/* コンテンツ */}
                  <div className="relative z-10 text-white space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {category.title}
                    </h3>
                    <p className="text-lg opacity-90">
                      {category.subtitle}
                    </p>
                    <p className="text-sm opacity-75">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-2 pt-2 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">ギャラリーを見る</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* フィーチャー画像セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-brown mb-4">
              注目の風景
            </h2>
            <p className="text-lg text-dark-brown/70 max-w-2xl mx-auto">
              それぞれの時間帯が持つ、特別な瞬間をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredImages.map((image, index) => (
              <div
                key={index}
                className="image-card animate-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                {/* 画像プレースホルダー */}
                <div className="aspect-[4/3] bg-gradient-to-br from-warm-beige/20 to-warm-beige/40 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Coffee className="h-12 w-12 text-coffee-brown/50 mx-auto animate-steam" />
                      <p className="text-coffee-brown/70 font-medium">
                        {image.title}
                      </p>
                    </div>
                  </div>
                  
                  {/* 時間バッジ */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-dark-brown">
                    {image.time}
                  </div>
                </div>

                {/* カード情報 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-dark-brown">
                      {image.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.badge === 'morning' ? 'bg-sunrise-orange/20 text-sunrise-orange' :
                      image.badge === 'work' ? 'bg-focus-blue/20 text-focus-blue' :
                      'bg-gold/20 text-gold'
                    }`}>
                      {image.category}
                    </span>
                  </div>
                  <p className="text-dark-brown/60 text-sm">
                    {image.badge === 'morning' ? '朝の静寂な時間に読書を楽しむ瞬間' :
                     image.badge === 'work' ? '集中して作業に取り組む午後のひととき' :
                     '夜カフェの温かな灯りに包まれた空間'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              href="/morning"
              className="btn-coffee inline-flex items-center space-x-2"
            >
              <span>すべてのギャラリーを見る</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 説明セクション */}
      <section className="py-20 bg-gradient-to-b from-cream to-warm-beige/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-brown">
              時間と共に移ろう風景
            </h2>
            <p className="text-lg text-dark-brown/80 leading-relaxed">
              朝の光に包まれた読書の時間から、集中して作業に取り組む午後、
              そして静寂な夜更けのひととき。<br />
              珈琲一杯と共に過ごす、日常の中の特別な瞬間を切り取りました。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className={`font-semibold ${category.textGradient}`}>
                    {category.title}
                  </h3>
                  <p className="text-sm text-dark-brown/60">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}