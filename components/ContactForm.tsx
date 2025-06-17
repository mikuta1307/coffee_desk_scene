// components/ContactForm.tsx
'use client'
import { useState } from 'react'
import { Send, Check, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  type: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    type: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const contactTypes = [
    '画像の利用について',
    'サイト制作のご相談',
    'AI画像生成について',
    'その他のご質問',
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問合せ内容を入力してください'
    } else if (formData.message.length < 10) {
      newErrors.message = '10文字以上で入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'message') {
      setCharCount(value.length)
    }

    // エラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    // 送信シミュレーション（実際のAPIを使用する場合はここを変更）
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // フォームリセット
      setFormData({
        name: '',
        email: '',
        type: '',
        message: '',
      })
      setCharCount(0)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <Check className="h-8 w-8 text-green-600 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-dark-brown mb-4">
          送信完了
        </h3>
        <p className="text-dark-brown/70 mb-6">
          お問合せありがとうございました。<br />
          通常1-2営業日以内にご返信いたします。
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-coffee"
        >
          新しいお問合せをする
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark-brown mb-2">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-coffee-brown transition-all duration-200 ${
            errors.name ? 'border-red-500 bg-red-50' : 'border-warm-beige'
          }`}
          placeholder="山田 太郎"
        />
        {errors.name && (
          <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-2">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-coffee-brown transition-all duration-200 ${
            errors.email ? 'border-red-500 bg-red-50' : 'border-warm-beige'
          }`}
          placeholder="example@email.com"
        />
        {errors.email && (
          <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* お問合せ種別 */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-dark-brown mb-2">
          お問合せ種別
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-warm-beige rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-coffee-brown transition-all duration-200 bg-white"
        >
          <option value="">選択してください</option>
          {contactTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* お問合せ内容 */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark-brown mb-2">
          お問合せ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-coffee-brown focus:border-coffee-brown transition-all duration-200 resize-vertical ${
            errors.message ? 'border-red-500 bg-red-50' : 'border-warm-beige'
          }`}
          placeholder="お問合せ内容をできるだけ詳しくお書きください..."
        />
        <div className="flex justify-between items-center mt-2">
          {errors.message ? (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.message}</span>
            </div>
          ) : (
            <div className="text-sm text-dark-brown/50">
              10文字以上で入力してください
            </div>
          )}
          <div className="text-sm text-dark-brown/50">
            {charCount}/1000
          </div>
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-coffee-brown hover:bg-coffee-brown/90 hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>送信中...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>お問合せを送信</span>
            </>
          )}
        </button>
      </div>

      {/* 注意事項 */}
      <div className="text-xs text-dark-brown/60 bg-warm-beige/20 p-4 rounded-lg">
        <p className="mb-2">※ このフォームはデモ用です。実際には送信されません。</p>
        <p>※ 個人情報は適切に管理し、お問合せ以外の目的には使用いたしません。</p>
      </div>
    </form>
  )
}