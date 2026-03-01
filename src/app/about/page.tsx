import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Portfolio",
};

export default function AboutPage() {
    return (
        <div className="max-w-prose mx-auto py-12">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors text-sm mb-8 inline-block">
                &larr; Back to Works
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-6">About</h1>
            <div className="prose prose-gray">
                <p>
                    Hello, this is my minimal portfolio. I build web applications and enjoy creating clean, user-friendly digital experiences.
                </p>
                <p>
                    This site is built with Next.js App Router, Tailwind CSS, and MDX. It focuses on performance, simplicity, and ease of content management.
                </p>
            </div>
        </div>
    );
}
