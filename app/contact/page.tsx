// app/contact/page.tsx
import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { Mail, ArrowLeft, Coffee, HelpCircle, User, FileText } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問合せ - 珈琲と机の風景',
  description: '画像利用や制作に関するご相談はこちらから',
  robots: 'noindex, nofollow, noarchive, nosnippet',
}

const faqData = [
  {
    question: '画像の利用について',
    answer: 'このサイトの画像はすべてAI生成によるデモ用のものです。実際の利用はできませんが、類似の画像制作についてはご相談ください。',
  },
  {
    question: 'サイトの制作について',
    answer: 'このサイトはNext.js + TypeScript + Tailwind CSSで制作されています。同様のサイト制作についてもお気軽にご相談ください。',
  },
  {
    question: 'AI画像生成について',
    answer: '展示されている画像はすべて架空のデモ用画像です。実際のAI画像生成サービスについては別途ご相談ください。',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-cream via-warm-beige/30 to-cream py-20 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 text-6xl text-coffee-brown animate-steam">📝</div>
          <div className="absolute bottom-20 right-16 text-5xl text-coffee-brown animate-steam" style={{animationDelay: '1s'}}>☕</div>
          <div className="absolute top-1/3 right-20 text-4xl text-coffee-brown animate-steam" style={{animationDelay: '2s'}}>✉️</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* パンくずナビ */}
          <nav className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-2 text-dark-brown/70 hover:text-dark-brown transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">ホームに戻る</span>
            </Link>
          </nav>

          {/* ページタイトル */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <Mail className="h-12 w-12 text-coffee-brown" />
              <h1 className="text-4xl md:text-5xl font-bold text-dark-brown">お問合せ</h1>
              <Coffee className="h-12 w-12 text-coffee-brown animate-steam" />
            </div>
            <p className="text-xl md:text-2xl text-dark-brown/80 font-light">
              ご質問・ご相談はお気軽に
            </p>
            <p className="text-dark-brown/70 max-w-2xl mx-auto leading-relaxed">
              画像の利用に関するお問合せや、サイト制作のご相談など、
              どのようなことでもお気軽にお声がけください。
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* お問合せフォーム */}
            <div className="lg:col-span-2">
              <div className="bg-cream/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Coffee className="h-6 w-6 text-coffee-brown" />
                  <h2 className="text-2xl font-bold text-dark-brown">
                    お問合せフォーム
                  </h2>
                </div>
                <p className="text-dark-brown/70 mb-8">
                  下記フォームに必要事項をご記入の上、送信してください。
                  通常1-2営業日以内にご返信いたします。
                </p>
                <ContactForm />
              </div>
            </div>

            {/* サイドバー */}
            <div className="space-y-8">
              {/* よくあるご質問 */}
              <div className="bg-warm-beige/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="h-6 w-6 text-coffee-brown" />
                  <h3 className="text-xl font-bold text-dark-brown">
                    よくあるご質問
                  </h3>
                </div>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="cursor-pointer text-dark-brown font-medium hover:text-coffee-brown transition-colors list-none">
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="text-sm">{faq.question}</span>
                          <span className="transform group-open:rotate-180 transition-transform text-coffee-brown">
                            ▼
                          </span>
                        </div>
                      </summary>
                      <div className="mt-2 p-3 text-sm text-dark-brown/70 leading-relaxed bg-white/30 rounded-lg">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* 制作者プロフィール */}
              <div className="bg-coffee-brown/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-6 w-6 text-coffee-brown" />
                  <h3 className="text-xl font-bold text-dark-brown">
                    制作者について
                  </h3>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-coffee-brown/20 rounded-full flex items-center justify-center">
                    <Coffee className="h-8 w-8 text-coffee-brown" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-brown">Demo Creator</p>
                    <p className="text-sm text-dark-brown/70">Web Developer</p>
                  </div>
                </div>
                <p className="text-sm text-dark-brown/70 leading-relaxed">
                  Next.js + TypeScript + Tailwind CSSを使用した
                  モダンなWebサイト制作を得意としています。
                  レスポンシブデザインとアクセシビリティに
                  配慮した制作を心がけています。
                </p>
              </div>

              {/* 利用規約リンク */}
              <div className="bg-amber/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-amber-700" />
                  <h3 className="text-xl font-bold text-dark-brown">
                    ご利用について
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-dark-brown/70">このサイトは架空のデモサイトです</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-dark-brown/70">画像はすべてAI生成によるものです</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-dark-brown/70">商用利用はできません</span>
                  </div>
                  <div className="pt-3">
                    <Link 
                      href="#" 
                      className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      <span>利用規約を確認する</span>
                      <span className="text-xs">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* その他のお問合せ方法 */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark-brown mb-8">
            その他のお問合せ方法
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-lg font-semibold text-dark-brown mb-2">
                メールでのお問合せ
              </h3>
              <p className="text-dark-brown/70 text-sm mb-4">
                直接メールでご連絡いただくことも可能です
              </p>
              <div className="text-coffee-brown font-medium text-sm">
                contact@demo-site.example
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-dark-brown mb-2">
                チャットサポート
              </h3>
              <p className="text-dark-brown/70 text-sm mb-4">
                リアルタイムでのご相談も承っています
              </p>
              <div className="text-coffee-brown font-medium text-sm">
                平日 10:00-18:00
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}