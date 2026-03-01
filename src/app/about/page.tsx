import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Portfolio",
};

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto py-20">
            <Link href="/" className="text-[10px] tracking-[0.3em] uppercase text-gray-300 hover:text-black transition-colors mb-16 inline-block font-extralight">
                &larr; Index
            </Link>
            <h1 className="text-5xl font-extralight tracking-tighter mb-12 text-black">About</h1>
            <div className="prose prose-gray prose-p:font-extralight prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg">
                <p>
                    I am a designer and developer focused on minimal and functional digital aesthetics.
                    I believe in the power of simplicity and the clarity of negative space.
                </p>
                <p>
                    This portfolio is a reflection of that philosophy—distilled to its essential components:
                    typography, grid, and content.
                </p>
            </div>
        </div>
    );
}
