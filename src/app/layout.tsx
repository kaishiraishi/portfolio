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
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}>
        <header className="px-6 py-4 flex justify-end items-center sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10">
          <Link href="/about" className="text-gray-600 hover:text-black font-medium transition-colors">
            About
          </Link>
        </header>
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
