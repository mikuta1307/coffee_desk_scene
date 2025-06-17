// utils/imageLoader.ts
import fs from 'fs'
import path from 'path'

export interface ImageData {
  id: string
  title: string
  description: string
  category: string
  filepath: string
  filename: string
}

interface GalleryConfig {
  themeColor: string
  themeIcon: string
  filters: string[]
  images: ImageData[]
}

// サポートされる画像拡張子
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

// カテゴリ別の設定
const CATEGORY_CONFIGS = {
  morning: {
    themeColor: 'sunrise-orange',
    themeIcon: '📚',
    filters: ['読書', '朝食', '軽作業', 'コーヒータイム'],
  },
  work: {
    themeColor: 'focus-blue',
    themeIcon: '✒️', 
    filters: ['デスクワーク', '資料作成', 'アイデア', '会議'],
  },
  afternoon: {
    themeColor: 'warm-pink',
    themeIcon: '🍰',
    filters: ['ティータイム', '読書', 'おしゃべり', 'スイーツ'],
  },
  night: {
    themeColor: 'gold',
    themeIcon: '🌙',
    filters: ['残業', '創作', '読書', '夜カフェ'],
  },
}

/**
 * ファイル名から画像情報を解析
 * フォーマット: {連番}_{タイトル}_{カテゴリ}.{拡張子}
 * 例: 01_朝の読書_読書.jpg
 */
function parseImageFilename(filename: string, category: string): ImageData | null {
  try {
    const ext = path.extname(filename).toLowerCase()
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      return null
    }

    const nameWithoutExt = path.basename(filename, ext)
    const parts = nameWithoutExt.split('_')
    
    if (parts.length >= 3) {
      // 標準フォーマット: 連番_タイトル_カテゴリ
      const [order, ...titleAndCategory] = parts
      const imageCategory = titleAndCategory.pop() || 'その他'
      const title = titleAndCategory.join('_') || filename
      
      return {
        id: `${category}_${filename}`,
        title,
        description: `${title}の風景をお楽しみください。`,
        category: imageCategory,
        filepath: `/images/gallery/${category}/${filename}`,
        filename,
      }
    } else {
      // フォールバック: ファイル名をそのまま使用
      return {
        id: `${category}_${filename}`,
        title: nameWithoutExt,
        description: `${nameWithoutExt}の風景をお楽しみください。`,
        category: 'その他',
        filepath: `/images/gallery/${category}/${filename}`,
        filename,
      }
    }
  } catch (error) {
    console.error(`Error parsing filename ${filename}:`, error)
    return null
  }
}

/**
 * 指定されたカテゴリの画像を読み込み
 */
export function loadCategoryImages(category: string): GalleryConfig {
  const config = CATEGORY_CONFIGS[category as keyof typeof CATEGORY_CONFIGS]
  
  if (!config) {
    throw new Error(`Unknown category: ${category}`)
  }

  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery', category)
  let images: ImageData[] = []

  try {
    // ディレクトリが存在するかチェック
    if (fs.existsSync(galleryPath)) {
      const files = fs.readdirSync(galleryPath)
      
      images = files
        .map(filename => parseImageFilename(filename, category))
        .filter((image): image is ImageData => image !== null)
        .sort((a, b) => a.filename.localeCompare(b.filename)) // ファイル名順でソート
    }
  } catch (error) {
    console.error(`Error loading images for category ${category}:`, error)
  }

  // 実際に使用されているカテゴリのみをフィルターに含める
  const usedCategories = Array.from(new Set(images.map(img => img.category)))
  const availableFilters = config.filters.filter(filter => 
    usedCategories.includes(filter)
  )

  return {
    themeColor: config.themeColor,
    themeIcon: config.themeIcon,
    filters: availableFilters,
    images,
  }
}

/**
 * すべてのカテゴリの画像を読み込み
 */
export function loadAllImages(): Record<string, GalleryConfig> {
  const categories = Object.keys(CATEGORY_CONFIGS)
  const result: Record<string, GalleryConfig> = {}

  categories.forEach(category => {
    try {
      result[category] = loadCategoryImages(category)
    } catch (error) {
      console.error(`Error loading category ${category}:`, error)
      result[category] = {
        themeColor: 'coffee-brown',
        themeIcon: '☕',
        filters: [],
        images: [],
      }
    }
  })

  return result
}

/**
 * 画像の統計情報を取得
 */
export function getImageStats(category?: string) {
  if (category) {
    const config = loadCategoryImages(category)
    return {
      total: config.images.length,
      categories: config.filters.length,
      byCategory: config.images.reduce((acc, img) => {
        acc[img.category] = (acc[img.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  const allImages = loadAllImages()
  const totalImages = Object.values(allImages).reduce((sum, config) => sum + config.images.length, 0)
  
  return {
    total: totalImages,
    byTimeSlot: Object.entries(allImages).reduce((acc, [slot, config]) => {
      acc[slot] = config.images.length
      return acc
    }, {} as Record<string, number>)
  }
}

/**
 * デモ用のサンプル画像データを生成
 */
export function generateSampleImages(category: string, count: number = 6): ImageData[] {
  const config = CATEGORY_CONFIGS[category as keyof typeof CATEGORY_CONFIGS]
  if (!config) return []

  const sampleImages: ImageData[] = []
  const categories = config.filters.length > 0 ? config.filters : ['その他']

  for (let i = 1; i <= count; i++) {
    const categoryIndex = (i - 1) % categories.length
    const imageCategory = categories[categoryIndex]
    
    sampleImages.push({
      id: `${category}_sample_${i}`,
      title: `${category === 'morning' ? '朝の' : 
               category === 'work' ? '作業中の' :
               category === 'afternoon' ? '午後の' : '夜の'}風景 ${i}`,
      description: `${imageCategory}の時間を表現した美しい画像です。珈琲と机のある日常の一コマをお楽しみください。`,
      category: imageCategory,
      filepath: `/images/placeholder/sample-${category}-${i}.jpg`,
      filename: `sample-${category}-${i}.jpg`,
    })
  }

  return sampleImages
}

export default {
  loadCategoryImages,
  loadAllImages,
  getImageStats,
  generateSampleImages,
}