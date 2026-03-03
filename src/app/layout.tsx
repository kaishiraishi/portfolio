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
        <header className="w-full max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] py-8 sticky top-0 z-10 text-[10px] uppercase">
          <div className="grid grid-cols-8 items-center gap-4">
            <Link href="/" className="col-span-2 text-primary hover:opacity-50 transition-opacity font-bold tracking-[0.1em]">
              KAI SHIRAISHI
            </Link>
            <div className="col-span-5" />
            <Link href="/about" className="col-span-1 text-right text-primary hover:opacity-50 transition-opacity font-extralight tracking-[0.1em]">
              About
            </Link>
          </div>
        </header>
        <main className="flex-1 w-full max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] pb-32">
          {children}
        </main>
      </body>
    </html>
  );
}
