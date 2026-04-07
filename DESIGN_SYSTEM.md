# Portfolio Design System

白石 快 (KAI SHIRAISHI) ポートフォリオのためのデザインシステム・ガイドライン。
ミニマリズム、スイス・スタイル、デジタル・プリミティブの融合をテーマにしています。

---

## 1. Color Palette

プロジェクトの中心となるカラーパレット。アクセシビリティとデジタル的な表現を重視。

| 役割 | HEX / CSS Variable | 用途 |
| :--- | :--- | :--- |
| **Primary / Foreground** | `#0027ff` (`--primary`) | 文字色、ヘッダー、主要な要素の色。ハイパーリンクブルー。 |
| **Background** | `#ffffff` (`--background`) | 背景色。広大なネガティブスペースを確保。 |
| **Border** | `#e6e6e6` (`--border`) | 区切り線、グリッドラインのベース、フォームボーダー。 |
| **Tertiary** | `#999999` (`--tertiary`) | 補助テキスト、時間表示、メタ情報。 |
| **Grid Line** | `rgba(0,0,0,0.04)` | 背景のガイドライン。控えめな質感。 |

---

## 2. Layout & Grid

8カラムのグリッドシステム。情報の整理と一貫性を担保。

- **Total Columns**: 8
- **Max Width**: `1152px` (デスクトップ)
- **Gutter (溝)**: `16px`
- **Baseline (行送り)**: `32px` (すべての余白は 32px の倍数で構成)
- **Margins**: 
  - Desktop: `72px`
  - Tablet: `32px`
  - Mobile: `16px`

---

## 3. Typography

**Font Family**: `Inter` (English), `Noto Sans JP` (Japanese)
**Weight**: `200` (Extra Light)
**Letter Spacing**: `0.01em` / `0.3em` (UpperCase / labels)
**Line Height**: `32px` (`line-height: normal` ではなく baseline に合わせる)

### 文字サイズ (Typographic Hierarchy)

| レベル | Tailwind Class | Pixel Size | 用途 |
| :--- | :--- | :--- | :--- |
| **Hero / Title** | `text-8xl` | `128px` | Aboutページ等の大見出し (leading-none) |
| **Main Header** | `text-6xl` | `60px` | セクション見出し (Mobile) |
| **Page Header** | `text-5xl` | `48px` | 作品タイトル、Aboutサブタイトル |
| **Large Text** | `text-4xl` | `36px` | 重要なメッセージ |
| **Sub Header** | `text-2xl` | `24px` | コンテンツ見出し (Hobby, Award等) |
| **Body Title** | `text-xl` | `20px` | 箇条書きの見出し |
| **Body Copy** | `text-lg` | `18px` | 一般的な長文テキスト |
| **Small UI** | `text-sm` | `14px` | 補助テキスト、キャプション |
| **Navigation** | `text-sm` | `14px` | ヘッダー等のナビゲーション。（※画面をシンプルに保つため「戻るボタン」等は全削除済み） |
| **Meta / Data** | `text-xs` | `12px` | 日付、時間、詳細情報 |
| **Overline (Labels)** | `text-xs` | `12px` | 「HISTORY」「HOBBY」等のラベル。 (`tracking-[0.3em]`, `opacity-70`) |

### MDX記事のスタイリングルール
本文中の小見出し（`h2`等）は、汎用の黒太字を避け、システムの青（`text-primary`）と細字（`font-normal`）に統合。視覚的な区切りとして薄い下線（`border-b`）を併用します。

## 4. Visual Styles

### ASCII Graphics
- **Source**: `video.mp4` / `image.jpg`
- **Component**: `<AsciiVideo />`
- **Text Rendering**: `Courier New`, `monospace`
- **Glow Effect**: 透明度を重ねた青のテキストレイヤーで構成。

### Grid Lines
- 背景に `linear-gradient` による 1px の線を表示。
- ベースラインピッチ: `128px` (32px * 4) に合わせてグリッドを表示。

---

## 5. Expected Image Sizes

レスポンシブ対応のための推奨アスペクト比と最小解像度。

- **Hero / Single Visual**: 
  - `1280 x 720` (16:9)
  - `1920 x 1080` (High Res)
- **Works Detail Visual (作品詳細)**: 
  - `aspect-video` (16:9) で統一。作品の質感や光沢を正しく伝えるため、**フルカラー（grayscale解除）** で表示。
- **Thumbnails / Profile Photo**: 
  - `grayscale` (彩度オフ) フィルタを適用し、ホバー時のみ色を持たせることで、ページ全体のソリッドな空間を維持。
