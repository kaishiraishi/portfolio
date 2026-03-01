"use client";

import { useState } from "react";
import { Work } from "@/lib/works";
import Link from "next/link";

interface WorksListProps {
    works: Work[];
}

export default function WorksList({ works }: WorksListProps) {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    return (
        <div className="relative min-h-[60vh]">
            {/* Full-screen Background Image on Hover */}
            <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out">
                {works.map((work) => (
                    <div
                        key={work.slug}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredImage === work.frontmatter.image ? "opacity-30" : "opacity-0"
                            }`}
                    >
                        {work.frontmatter.image && (
                            <img
                                src={work.frontmatter.image}
                                alt=""
                                className="w-full h-full object-cover grayscale brightness-125"
                            />
                        )}
                    </div>
                ))}
                {/* Subtle overlay to maintain text readability */}
                <div className={`absolute inset-0 bg-white/40 transition-opacity duration-700 ${hoveredImage ? "opacity-100" : "opacity-0"}`} />
            </div>

            {works.length === 0 ? (
                <p className="relative z-10 text-primary/50 font-light text-[10px] tracking-[0.1em] uppercase">No works found.</p>
            ) : (
                <nav className="relative z-10 flex flex-col md:ml-[50%] space-y-4">
                    {works.map(({ slug, frontmatter }) => (
                        <Link
                            key={slug}
                            href={`/works/${slug}`}
                            className="group inline-block w-fit"
                            onMouseEnter={() => setHoveredImage(frontmatter.image || null)}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <h2 className="text-4xl sm:text-5xl font-light tracking-tighter text-primary leading-none group-hover:pl-4 transition-all duration-500 ease-out">
                                {frontmatter.title}
                                <span className="text-primary/20 ml-4 inline-block transform translate-y-[-0.2em] text-lg sm:text-xl font-extralight">
                                    / {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                                </span>
                            </h2>
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
}
