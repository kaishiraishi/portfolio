"use client";

import { useState } from "react";
import { Work } from "@/lib/works";
import Link from "next/link";

interface WorksListProps {
    works: Work[];
}

export default function WorksList({ works }: WorksListProps) {
    const [hoveredWork, setHoveredWork] = useState<Work | null>(null);

    return (
        <div className="relative min-h-[50vh]">
            {/* Full-screen Background Image on Hover */}
            <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out">
                {works.map((work) => (
                    <div
                        key={work.slug}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${hoveredWork?.slug === work.slug ? "opacity-60" : "opacity-0"
                            }`}
                    >
                        {work.frontmatter.image && (
                            /\.(mp4|webm)$/i.test(work.frontmatter.image) ? (
                                <video
                                    src={work.frontmatter.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover grayscale brightness-125"
                                />
                            ) : (
                                <img
                                    src={work.frontmatter.image}
                                    alt=""
                                    className="w-full h-full object-cover grayscale brightness-125"
                                />
                            )
                        )}
                    </div>
                ))}
                {/* Subtle overlay to maintain text readability */}
                <div className={`absolute inset-0 bg-white/20 transition-opacity duration-700 ${hoveredWork ? "opacity-100" : "opacity-0"}`} />
            </div>

            {works.length === 0 ? (
                <p className="relative z-10 text-primary/50 font-light text-[10px] tracking-[0.1em] uppercase">No works found.</p>
            ) : (
                <div className="relative z-10 grid grid-cols-8 gap-4 px-4 md:px-0">
                    {/* Nav occupies left 4 columns (col 1-4) */}
                    <nav className="col-span-8 md:col-span-4 flex flex-col gap-4">
                        {works.map((work) => (
                            <Link
                                key={work.slug}
                                href={`/works/${work.slug}`}
                                className="group inline-block w-fit"
                                onMouseEnter={() => setHoveredWork(work)}
                                onMouseLeave={() => setHoveredWork(null)}
                            >
                                <h2 
                                    className={`whitespace-nowrap text-[2rem] sm:text-4xl md:text-5xl font-light tracking-tighter leading-tight sm:leading-[48px] md:leading-[64px] transition-all duration-500 ease-out md:group-hover:translate-x-4 ${
                                        hoveredWork && hoveredWork.slug !== work.slug ? 'text-black/30' : 'text-primary'
                                    }`} 
                                >
                                    {work.frontmatter.title}
                                    <span 
                                        className={`text-[#999999] opacity-80 ml-2 sm:ml-4 inline-block transform translate-y-[-0.1em] text-lg sm:text-xl md:text-2xl font-extralight tracking-tighter transition-all duration-500 ease-out ${
                                            hoveredWork && hoveredWork.slug !== work.slug ? 'text-black/30' : ''
                                        }`}
                                    >
                                        / {work.frontmatter.date ? new Date(work.frontmatter.date).getFullYear() : '—'}
                                    </span>
                                </h2>
                            </Link>
                        ))}
                    </nav>

                    {/* Summary display in bottom right (col 6-8) */}
                    <div className="hidden md:block col-start-6 col-span-3 self-end">
                        <div
                            className={`transition-all duration-500 ease-out ${hoveredWork ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                            style={{ paddingBottom: '32px' }}
                        >
                            <p className="text-primary text-sm font-light leading-relaxed text-left tracking-tight">
                                {hoveredWork?.frontmatter.summary}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
