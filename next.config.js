// next.config.js - 画像最適化設定を追加

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化設定
  images: {
    // 外部画像ドメインの許可（必要に応じて）
    domains: [],
    // 画像形式の設定
    formats: ['image/webp', 'image/avif'],
    // 画像サイズの設定
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 静的ファイルの最適化
  compress: true,
  
  // PWA設定（オプション）
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // ヘッダー設定（セキュリティとSEO対策）
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig