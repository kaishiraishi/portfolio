import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 開発環境(ローカル)ではエラーにならないよう basePath を無効にし、本番ビルド時のみ "/portfolio" が付与されるように変更します
  basePath: process.env.NODE_ENV === 'production' ? "/portfolio" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
