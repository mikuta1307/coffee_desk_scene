# 珈琲と机の風景

時間帯別の珈琲と机のシーンを表現した画像ギャラリーサイト

## 📖 プロジェクト概要

「珈琲と机の風景」は、AI生成画像ギャラリーサイトです。このプロジェクトは架空のWebサイトであり、実際のサービスは提供していません。

コンセプトは「日常に息づく、静かな時間の記録」をテーマに、珈琲と机のある風景を時間帯別に分類して展示するサイトとして設計されています。

Next.js + TypeScript + Tailwind CSSで構築され、レスポンシブデザインとアクセシビリティに配慮した実装となっています。

※このプロジェクトは架空のWebサイトであり、実際のサービスは提供していません。

### 🎨 コンセプト
- **モーニングタイム**: 朝の光に包まれた読書・軽作業シーン（6枚）
- **集中作業**: 生産性の高い作業風景（6枚）
- **午後のひととき**: リラックスした会話・読書タイム（6枚）  
- **夜更けの時間**: 夜カフェ・創作活動の風景（7枚）

**合計25枚のAI生成画像を展示**

## 🛠 技術構成

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アニメーション**: CSS Animations
- **アイコン**: Lucide React
- **画像**: AI生成PNG画像 (1.2-2.1MB各)
- **デプロイ**: Vercel

## 📁 ディレクトリ構造

```
coffee_desk_scene/
├── app/
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx               # トップページ
│   ├── globals.css            # グローバルスタイル + カスタムアニメーション
│   ├── morning/
│   │   └── page.tsx           # モーニングタイムページ
│   ├── work/
│   │   └── page.tsx           # 集中作業ページ
│   ├── afternoon/
│   │   └── page.tsx           # 午後のひとときページ
│   ├── night/
│   │   └── page.tsx           # 夜更けの時間ページ
│   └── contact/
│       └── page.tsx           # お問合せページ（デモ用）
├── components/
│   ├── ui/
│   │   ├── Header.tsx         # ヘッダーコンポーネント（モバイル対応）
│   │   └── Footer.tsx         # フッターコンポーネント
│   ├── Gallery.tsx            # メインギャラリーコンポーネント
│   ├── ImageModal.tsx         # 画像モーダル（キーボード操作対応）
│   ├── ContactForm.tsx        # お問合せフォーム（デモ用）
│   └── DemoBanner.tsx         # デモサイト注意バナー
├── public/
│   ├── images/
│   │   ├── gallery/           # 時間帯別画像ギャラリー
│   │   │   ├── morning/       # 朝の画像（6枚）
│   │   │   ├── work/          # 作業の画像（6枚）
│   │   │   ├── afternoon/     # 午後の画像（6枚）
│   │   │   └── night/         # 夜の画像（7枚）
│   │   └── hero/              # ヒーローセクション背景画像（4枚）
│   └── robots.txt             # 検索エンジン制御
├── utils/
│   └── imageLoader.ts         # サーバーサイド画像読み込みユーティリティ
├── LICENSE.txt                # MIT License
├── README.md                  # プロジェクト説明書
├── next.config.js             # Next.js設定
├── package.json               # パッケージ設定・依存関係
├── tailwind.config.js         # Tailwind CSS設定
├── tsconfig.json              # TypeScript設定
└── vercel.json                # Vercel デプロイ設定
```

## 🚀 セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でサイトが立ち上がります。

### 3. ビルドと本番実行

```bash
# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## 🖼️ 画像ファイル命名規則

画像は以下のフォーマットで命名してください：

```
{連番}_{タイトル}_{カテゴリ}.{拡張子}
```

**実際の例：**
- `01_朝の読書風景mid_朝の読書風景.png`
- `02_朝食シーンmid_朝食シーン.png`
- `05_資料作成シーン_集中作業sea.png`

### 各時間帯のカテゴリ

**モーニングタイム：**
- 朝の読書風景
- 朝食シーン
- 軽作業の様子

**集中作業：**
- デスクワーク風景
- 資料作成シーン
- アイデア整理

**午後のひととき：**
- アフタヌーンティー（午後のひとときmid）
- カフェ雰囲気（午後のひとときmid）
- 読書とくつろぎ（午後のひとときmid）

**夜更けの時間：**
- 夜の照明風景（夜更けの時間mid）
- 夜更けの読書（夜更けの時間mid）
- 創作活動（夜更けの時間mid）
- 深夜カフェ（夜更けの時間mid）

## 🎨 デザイン仕様

### カラーパレット
- **ベース**: クリーム色（#F5F1EB）、ダークブラウン（#3C2415）
- **時間帯別アクセント**:
  - モーニング: サンライズオレンジ（#FF8A65）
  - 作業: フォーカスブルー（#42A5F5）
  - 午後: ウォームピンク（#F48FB1）
  - 夜: ゴールド（#F39C12）

### レスポンシブ対応
- **PC**: 3列グリッド、スムーズなアニメーション
- **タブレット**: 2列グリッド、タッチ操作対応
- **スマートフォン**: 1列縦スクロール、ハンバーガーメニュー

### カスタムアニメーション
- **蒸気エフェクト** (`animate-steam`): 珈琲カップの蒸気
- **きらめき** (`animate-sparkle`): 夜の星空エフェクト
- **フェードイン** (`animate-fade-in`): 要素の段階的表示
- **スライドアップ** (`animate-slide-up`): モバイルメニューの表示

## 📱 機能一覧

### 基本機能
- [x] レスポンシブデザイン
- [x] 時間帯別ギャラリー表示（4つの時間帯、合計25枚）
- [x] カテゴリフィルタリング機能
- [x] グリッド/メイソンリー表示切替
- [x] ダークモード切替
- [x] 画像モーダル（キーボード操作対応）
- [x] お問合せフォーム（デモ用）

### 特殊機能
- [x] サーバーサイド画像読み込み（imageLoader.ts）
- [x] 動的統計情報表示
- [x] スケルトンローディング
- [x] セッション管理による表示制御
- [x] フォームバリデーション
- [x] デモサイト注意バナー

### 画像モーダル操作
- **キーボードショートカット**:
  - `←/→` or `↑/↓`: 前後の画像
  - `Space`: ズーム切替
  - `F`: お気に入り切替
  - `Ctrl+D`: ダウンロード
  - `Esc`: モーダルを閉じる

## 🔍 画像統計（現在の状況）

| 時間帯 | 画像数 | 主要カテゴリ |
|--------|--------|-------------|
| モーニングタイム | 6枚 | 朝の読書風景、朝食シーン、軽作業の様子 |
| 集中作業 | 6枚 | デスクワーク風景、資料作成シーン、アイデア整理 |
| 午後のひととき | 6枚 | アフタヌーンティー、カフェ雰囲気、読書とくつろぎ |
| 夜更けの時間 | 7枚 | 夜の照明風景、夜更けの読書、創作活動、深夜カフェ |
| **合計** | **25枚** | - |

## 🔒 SEO・セキュリティ対策

### 検索エンジン対策
- Next.js App Router による Server-Side Rendering
- 各ページの適切なメタデータ設定
- 画像の最適化とalt属性
- robots.txt による検索エンジン制御

## 🎯 主要コンポーネント詳細

### Gallery.tsx
- グリッド/メイソンリー表示切替
- ライト/ダークテーマ対応
- カテゴリフィルタリング
- レスポンシブ対応
- 動的統計表示

### ImageModal.tsx
- フルスクリーン画像表示
- キーボードナビゲーション
- ズーム機能
- お気に入り機能
- ダウンロード機能
- コントロール自動非表示

### imageLoader.ts
- サーバーサイド画像読み込み
- ファイル名パターン解析
- 統計情報生成
- エラーハンドリング

## 🚀 デプロイ

### Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. Vercelで新規プロジェクト作成
3. リポジトリを選択してデプロイ

設定は`vercel.json`で管理されています。

## 📜 ライセンス

このプロジェクトは架空のサイトです。  
コードは[MITライセンス](LICENSE)の下で公開しています。これは以下を意味します：

- 自由に使用、修正、配布可能（商用利用も含む）
- 著作権表示とライセンス表示を維持すること
- 作者は法的責任を負わない

※ 画像ファイルについては適切な権利を持つものを使用し、同様にMITライセンスを適用します。

## 👨‍💻 作者

[mikuta1307]

デモサイト: https://coffee-desk-scene.vercel.app/
