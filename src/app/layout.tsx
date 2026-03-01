import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-white text-black min-h-screen flex flex-col font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-extralight tracking-tight`}>
        <header className="px-8 py-12 flex justify-end items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <Link href="/about" className="text-gray-400 hover:text-black font-extralight transition-colors text-xs tracking-[0.3em] uppercase">
            About
          </Link>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-8 pb-32">
          {children}
        </main>
      </body>
    </html>
  );
}
