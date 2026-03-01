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
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="max-w-5xl mx-auto h-full border-x border-gray-100/50 relative">
            <div className="absolute left-12 top-0 bottom-0 border-l border-gray-100/30" />
            <div className="absolute right-12 top-0 bottom-0 border-r border-gray-100/30" />
          </div>
        </div>
        <header className="px-12 py-16 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 text-[10px] uppercase">
          <Link href="/" className="text-black hover:text-gray-400 transition-colors font-bold tracking-[0.1em]">
            KAI SHIRAISHI
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-black transition-colors font-extralight tracking-[0.4em]">
            About
          </Link>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-12 pb-32">
          {children}
        </main>
      </body>
    </html>
  );
}
