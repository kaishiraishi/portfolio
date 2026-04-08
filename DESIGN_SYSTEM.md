# Portfolio Design System

白石 快 (KAI SHIRAISHI) ポートフォリオのためのデザインシステム・ガイドライン。
ミニマリズム、スイス・スタイル、デジタル・プリミティブの融合をテーマにしています。

---

## 1. Color Palette

プロジェクトの中心となるカラーパレット。アクセシビリティとデジタル的な表現を重視。TailwindCSS v4の変数解決の不具合回避のため、コア部分はハードコーディングされたHEX値を併用。

| 役割 | HEX / CSS Variable | 用途 |
| :--- | :--- | :--- |
| **Primary / Foreground** | `#0027ff` (`--primary`) | タイトル、主要な要素の色。ハイパーリンクブルー。 |
| **Background** | `#ffffff` (`--background`) | 背景色。広大なネガティブスペースを確保。 |
| **Border** | `#e6e6e6` (`--border`) | 区切り線、グリッドラインのベース、フォームボーダー。 |
| **Tertiary** | `#999999` (`--tertiary`) | 補助テキスト、時間表示、ギャラリーのキャプションやUI。 |
| **Body Gray** | `#777777` | 記事詳細における長文段落、見出し等（可読性確保のため）。 |
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

### ページ別レイアウト固有ルール
- **Header**: ヘッダーは `bg-white/50 backdrop-blur-sm` によるすりガラス効果を用い、スクロールに完全に追従する。
- **Top Page**: 一枚絵（100vhに収まるスクロール固定のキャンバス）として実装。余白を詰めて画面中心にリストを配置。

---

## 3. Typography

**Font Family**: `Inter` (English), `Noto Sans JP` (Japanese)
**Weight**: `200` (Extra Light) / 本文はLightを中心に構成。
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
| **Body Copy** | `text-lg / base` | `18px / 16px` | 一般的な長文テキスト |
| **Navigation** | `text-sm` | `14px` | KAI SHIRAISHI / About 等のヘッダーナビ。（※画面をシンプルに保つため戻るボタン等は全削除済み） |
| **Small UI** | `text-sm` | `14px` | 補助テキスト、ギャラリーのキャプション (`#999999`) |
| **Meta / Data** | `text-xs` | `12px` | 日付、時間、詳細情報 |
| **Overline (Labels)** | `text-xs` | `12px` | 「HISTORY」「HOBBY」等のラベル。 (`tracking-[0.3em]`, `opacity-70`) |

### インタラクション & MDX記事のスタイリングルール
- **Works 一覧 (Top Page)**:
  - タイトルの右横にインラインで年号（例: `/ 2025`）を配置。
  - いずれかの要素をホバーした際、他の非ホバー要素（タイトルと年号）は `text-black/30`（黒の30%透過）にフェードダウンスタイルさせ、背景画像プレビュー（opacity-60）を浮かび上がらせる。
- **Works 詳細 (MDX)**:
  - 長文の可読性を高めるため、見出し(`h2`)、強調(`strong`)、本文(`p`)、リスト(`li`)は全て `#777777`（やや暗いグレー）に統一。
  - トップページと見え方を揃えるため、大見出しにも年号をインライン表示（例: Title / 2025）し、年号部分は `#999999` (斜体なし) に指定。

---

## 4. Visual Styles

### ASCII Graphics
- **コンポーネント**: `<AsciiVideo />`
- **Cell Size**: 視認性を保つため `CELL = 6` で固定。
- **カラーリング**: `#0027ff` ベースでレンダリング（RGB値の輝度をもとに文字として描画）。
  ※ 現在はトップページからは一時的に非表示（WorksListのみの構成）。

### Grid Lines
- 背景に `linear-gradient` による 1px の線を表示。
- ベースラインピッチ: `128px` (32px * 4) に合わせてグリッドを表示することで、ブループリント・設計図のような精緻さを表現。

---

## 5. Expected Image Sizes

レスポンシブ対応のための推奨アスペクト比と最小解像度ルール。

- **Hero / Single Visual**: 
  - `1280 x 720` (16:9) または `1920 x 1080` (High Res)
- **Works Detail Visual (作品詳細)**: 
  - `aspect-video` (16:9) で統一。作品の質感や光沢を正しく伝えるため、**フルカラー（grayscale解除）** で表示。
- **Image Gallery**:
  - 画像のキャプション表示や、Lightboxでのページャー・UIアイコンは、すべて `#999999` を指定して作品の邪魔にならないようにする。
- **Thumbnails / Profile Photo**: 
  - Aboutページ等のサムネイルには `grayscale` (彩度オフ) フィルタを適用し、全体のソリッドな空間を維持する意匠。
