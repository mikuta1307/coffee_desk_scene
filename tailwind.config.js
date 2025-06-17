/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['Dancing Script', 'cursive'],
      },
      colors: {
        // 必要最小限のカスタムカラーのみ
        'cream': '#F5F1EB',
        'dark-brown': '#3C2415',
        'coffee-brown': '#8B4513',
        'warm-beige': '#D2B48C',
        'sunrise-orange': '#FF8A65',
        'focus-blue': '#42A5F5',
        'warm-pink': '#F48FB1',
        'gold': '#F39C12',
        'amber': '#FFC107',
      },
      backgroundImage: {
        'morning-gradient': 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)',
        'work-gradient': 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        'afternoon-gradient': 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)',
        'night-gradient': 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'steam': 'steam 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        steam: {
          '0%': { opacity: '0.7', transform: 'translateY(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'translateY(-10px) rotate(2deg)' },
          '100%': { opacity: '0.7', transform: 'translateY(0) rotate(0deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
  // 重要：標準のグレーカラーを明示的に含める
  safelist: [
    // 標準のグレーカラー
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-300',
    'bg-gray-400',
    'bg-gray-500',
    'bg-gray-600',
    'bg-gray-700',
    'bg-gray-800',
    'bg-gray-900',
    'text-gray-50',
    'text-gray-100',
    'text-gray-200',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'border-gray-300',
    'border-gray-700',
    // ホバー効果
    'hover:bg-gray-50',
    'hover:bg-gray-100',
    'hover:bg-gray-700',
    // 透明度付き
    'bg-gray-800/90',
    'bg-white/90',
    // カスタムカラー
    'bg-orange-400',
    'bg-blue-400',
    'bg-pink-400',
    'bg-yellow-400',
    'text-orange-400',
    'text-blue-400',
    'text-pink-400',
    'text-yellow-400',
    'bg-amber-700',
    // アニメーション
    'animate-fade-in',
    'animate-steam',
    'animate-sparkle',
  ],
}