"use client";

import { useEffect, useRef } from "react";

// ─ Theme ─────────────────────────────────────────────────────────────────────
const THEME = {
  background: "#ffffff",
  primary: "#0027ff",   // 暗い部分
  tertiary: "#999999",  // 明るい部分
  border: "#e6e6e6",
};

// ─ p5同等パラメータ ─────────────────────────────────────────────────────────
const CHARS =
  "@#S%?*+;:,. " +
  "MBÆ&WNQR$HDK0OPY568T4EA93Z72X1UCGLJIVFt" +
  "fmwqpdbkhaoeuisnryzxcvjl![]{}()/|\\-_~<>^`'\"";
const CELL = 6;
const MIRROR = true;
const GAMMA = 1.0;
const BRIGHTNESS_LEVELS = 0; // 0 = オフ
const USE_BLUE_ONLY = true;

// 16進カラー → {r, g, b}
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

// 線形補間（0=primary, 1=tertiary）
function lerpRgb(t: number): string {
  const a = hexToRgb(THEME.primary);
  const b = hexToRgb(THEME.tertiary);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bv = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bv})`;
}

// 輝度の段階化
function quantize(v: number, levels: number): number {
  if (levels <= 1) return v;
  return Math.round(v * (levels - 1)) / (levels - 1);
}

interface AsciiVideoProps {
  src?: string;
  width?: number;
  height?: number;
}

export default function AsciiVideo({
  src = "/video.mp4",
  width = 640,
  height = 480,
}: AsciiVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // offscreen canvas（ピクセル取得用）
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    offscreenRef.current = offscreen;

    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    const ctx = canvas.getContext("2d");
    if (!offCtx || !ctx) return;

    const draw = () => {
      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      const ow = offscreen.width;
      const oh = offscreen.height;

      // ─ 動画フレームをオフスクリーンに描画 ─
      offCtx.drawImage(video, 0, 0, ow, oh);
      const frame = offCtx.getImageData(0, 0, ow, oh).data;

      // ─ 背景 ─
      ctx.fillStyle = THEME.background;
      ctx.fillRect(0, 0, w, h);

      // ─ テキスト設定 ─
      const fontSize = CELL * 1.2;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < h; y += CELL) {
        for (let x = 0; x < w; x += CELL) {
          // mirror
          const sx = MIRROR ? w - 1 - x : x;

          const fx = Math.floor((sx / w) * ow);
          const fy = Math.floor((y / h) * oh);

          const idx = (fy * ow + fx) * 4;
          const r = frame[idx];
          const g = frame[idx + 1];
          const b = frame[idx + 2];

          let bright = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          bright = Math.pow(bright, GAMMA);

          if (BRIGHTNESS_LEVELS > 1) {
            bright = quantize(bright, BRIGHTNESS_LEVELS);
          }

          const ci = Math.min(
            Math.floor(bright * (CHARS.length - 1)),
            CHARS.length - 1
          );
          const ch = CHARS[ci];

          ctx.fillStyle = USE_BLUE_ONLY
            ? lerpRgb(bright)
            : `rgb(${r},${g},${b})`;

          ctx.fillText(ch, x + CELL / 2, y + CELL / 2);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    let started = false;

    const startDraw = () => {
      if (started) return;
      started = true;
      video.play().catch((e) => console.warn("AsciiVideo: play() blocked:", e));
      draw();
    };

    const onCanPlay = () => startDraw();
    const onLoadedData = () => startDraw();

    const onError = () => {
      const me = video.error;
      const codeMap: Record<number, string> = {
        1: "MEDIA_ERR_ABORTED",
        2: "MEDIA_ERR_NETWORK",
        3: "MEDIA_ERR_DECODE",
        4: "MEDIA_ERR_SRC_NOT_SUPPORTED",
      };
      const code = me ? codeMap[me.code] ?? `code=${me.code}` : "unknown";
      console.error(`AsciiVideo: 動画エラー [${code}]`, me?.message ?? "", src);
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);

    // src を JS から直接セットして load() を明示的に1回だけ呼ぶ
    video.src = src;
    video.load();

    return () => {
      started = true; // cleanup後に startDraw が走らないようにする
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load(); // リソース解放
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [src, width, height]);

  const levels =
    BRIGHTNESS_LEVELS > 1 ? String(BRIGHTNESS_LEVELS) : "off";

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* 非表示の動画要素（src は useEffect 内で JS から設定） */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* ASCIIアートキャンバス */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: "block", imageRendering: "pixelated", maxWidth: "100%", height: "auto" }}
      />

      {/* HUD（p5の drawHUD() 相当） */}
      <div
        className="font-mono text-[11px] leading-relaxed"
        style={{ color: THEME.tertiary }}
      >
        <span style={{ color: THEME.primary }}>chars</span>{" "}
        {CHARS.length}
        {"  "}
        <span style={{ color: THEME.primary }}>levels</span>{" "}
        {levels}
        {"  "}
        <span style={{ color: THEME.primary }}>cell</span>{" "}
        {CELL}
        {"  "}
        <span style={{ color: THEME.primary }}>gamma</span>{" "}
        {GAMMA.toFixed(1)}
      </div>
    </div>
  );
}
