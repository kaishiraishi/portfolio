import { getWorkBySlug, getAllWorks } from "@/lib/works";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) {
        return {
            title: "Not Found",
        };
    }

    return {
        title: `${work.frontmatter.title} | Portfolio`,
        description: work.frontmatter.summary,
    };
}

export async function generateStaticParams() {
    const works = getAllWorks();
    return works.map((work) => ({
        slug: work.slug,
    }));
}

export default async function WorkDetailPage({ params }: Props) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work) {
        notFound();
    }

    const { frontmatter, content } = work;

    return (
        <article className="pt-8 pb-0">
            <div className="grid grid-cols-8 gap-4">
                {/* ── Text header: col 1-8 ── */}
                <div className="col-span-8 mb-8">
                    <h1 className="text-6xl sm:text-8xl font-light tracking-tighter mb-4 text-primary leading-[0.85]">
                        {frontmatter.title}
                        <span className="text-primary/20 ml-6 sm:ml-10">
                            / {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                        </span>
                    </h1>

                    <div className="flex gap-8 items-baseline mt-6">
                        {frontmatter.role && (
                            <span className="text-[10px] uppercase tracking-[0.1em] text-primary/40 font-light">
                                {frontmatter.role}
                            </span>
                        )}
                        {frontmatter.repo && (
                            <a href={frontmatter.repo} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] uppercase tracking-[0.1em] text-primary hover:opacity-50 transition-opacity underline underline-offset-8 decoration-border font-light">
                                Repository
                            </a>
                        )}
                        {frontmatter.demo && (
                            <a href={frontmatter.demo} target="_blank" rel="noopener noreferrer"
                                className="text-[10px] uppercase tracking-[0.1em] text-primary hover:opacity-50 transition-opacity underline underline-offset-8 decoration-border font-light">
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Full-width image: col 1-8 ── */}
                {frontmatter.image && (
                    <div className="col-span-8 w-full" style={{ height: 'calc(100vh - 220px)' }}>
                        <img
                            src={frontmatter.image}
                            alt={frontmatter.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* ── Content: col 1-7 (giving some air on the right) ── */}
                <div className="col-span-8 lg:col-span-7 pt-16 pb-32">
                    {frontmatter.summary && (
                        <p className="text-lg text-primary/60 font-light leading-relaxed mb-16 tracking-tight">
                            {frontmatter.summary}
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20 uppercase tracking-[0.1em] font-light text-sm">
                        <div>
                            <span className="block text-primary/30 text-[10px] mb-4">Role</span>
                            <span className="text-primary">{frontmatter.role}</span>
                        </div>
                        <div>
                            <span className="block text-primary/30 text-[10px] mb-4">Tech Stack</span>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-primary">
                                {frontmatter.tech.map((t, i) => (
                                    <span key={t}>{t}{i < frontmatter.tech.length - 1 ? "," : ""}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-blue max-w-none font-light prose-headings:font-light prose-headings:tracking-tight prose-headings:text-primary prose-p:font-light prose-p:text-primary/70 prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:underline prose-a:underline-offset-8 prose-a:decoration-border">
                        <MDXRemote source={content} />
                    </div>
                </div>
            </div>
        </article>
    );
}
