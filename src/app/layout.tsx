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
      <body className={`${inter.className} bg-white text-black min-h-screen flex flex-col font-['Helvetica_Neue',Helvetica,sans-serif] font-extralight tracking-tight`}>
        <header className="px-6 sm:px-8 py-16 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 font-extralight text-[10px] tracking-[0.4em] uppercase">
          <Link href="/" className="text-black hover:text-gray-400 transition-colors">
            KAI SHIRAISHI
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-black transition-colors">
            About
          </Link>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8 pb-32">
          {children}
        </main>
      </body>
    </html>
  );
}
