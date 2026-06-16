import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import GridOverlay from "@/components/GridOverlay";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-noto-jp",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Minimal portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/200.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/300.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/400.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/500.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/600.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gen-interface-jp@0.6.2/cdn/700.css" />
      </head>
      <body className={`${inter.variable} ${notoSansJP.variable} bg-white text-primary min-h-screen flex flex-col tracking-tight`}>
        <GridOverlay />
        <div className="relative z-10 flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1 w-full max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] pb-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
