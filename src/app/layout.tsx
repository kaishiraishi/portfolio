import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GridOverlay from "@/components/GridOverlay";

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
      <body className={`${inter.variable} ${notoSansJP.variable} bg-white text-primary min-h-screen flex flex-col tracking-tight`}>
        <GridOverlay />
        <div className="relative z-10 flex flex-col min-h-screen">
          <header className="w-full sticky top-0 z-50 py-8 bg-white/50 backdrop-blur-sm transition-all">
            <div className="max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] text-sm flex justify-between items-center">
              <Link href="/" className="text-primary hover:opacity-50 transition-opacity font-light font-['Helvetica_Neue',Helvetica,sans-serif] tracking-[0.1em]">
                KAI SHIRAISHI
              </Link>
              <Link href="/about" className="text-primary hover:opacity-50 transition-opacity font-light font-['Helvetica_Neue',Helvetica,sans-serif] tracking-[0.1em]">
                About
              </Link>
            </div>
          </header>
          <main className="flex-1 w-full max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] pb-32">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
