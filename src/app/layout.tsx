import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";



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
      <body className="bg-white text-primary min-h-screen flex flex-col tracking-tight uppercase-none">

        <header className="max-w-5xl mx-auto w-full px-[72px] py-16 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10 text-[10px] uppercase border-b border-border">
          <Link href="/" className="text-primary hover:opacity-50 transition-opacity font-bold tracking-[0.1em]">
            KAI SHIRAISHI
          </Link>
          <Link href="/about" className="text-primary hover:opacity-50 transition-opacity font-extralight tracking-[0.1em]">
            About
          </Link>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto px-[72px] pb-32">
          {children}
        </main>
      </body>
    </html>
  );
}
