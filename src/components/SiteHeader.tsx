"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`w-full sticky top-0 z-50 py-8 transition-all ${
        isHome ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {!isHome && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.5)",
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,1) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,1) 100%)",
          }}
        />
      )}
      <div className="max-w-[1152px] mx-auto px-4 md:px-8 lg:px-[72px] text-sm flex justify-between items-center">
        <Link
          href="/"
          className="relative z-10 text-primary hover:opacity-50 transition-opacity font-light font-['Helvetica_Neue',Helvetica,sans-serif] tracking-[0.1em]"
        >
          KAI SHIRAISHI
        </Link>
        <Link
          href="/about"
          className="relative z-10 text-primary hover:opacity-50 transition-opacity font-light font-['Helvetica_Neue',Helvetica,sans-serif] tracking-[0.1em]"
        >
          About
        </Link>
      </div>
    </header>
  );
}