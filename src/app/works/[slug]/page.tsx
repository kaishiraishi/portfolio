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
        <article className="py-20">
            <div className="mb-32">
                <Link href="/" className="text-[10px] tracking-[0.1em] uppercase text-primary/30 hover:text-primary transition-colors mb-20 inline-block font-extralight">
                    &larr; Index
                </Link>

                {/* Header: Title -> Summary -> Links */}
                <div className="mb-24">
                    <h1 className="text-6xl sm:text-8xl font-extralight tracking-tighter mb-10 text-primary leading-[0.85]">{frontmatter.title}</h1>

                    {frontmatter.summary && (
                        <p className="text-lg sm:text-xl text-primary/70 font-extralight leading-relaxed max-w-2xl mb-12 tracking-tight">
                            {frontmatter.summary}
                        </p>
                    )}

                    <div className="flex gap-10">
                        {frontmatter.repo && (
                            <a href={frontmatter.repo} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-opacity underline underline-offset-8 decoration-border">
                                Repository
                            </a>
                        )}
                        {frontmatter.demo && (
                            <a href={frontmatter.demo} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-opacity underline underline-offset-8 decoration-border">
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {frontmatter.image && (
                    <div className="mb-24 aspect-[21/9] overflow-hidden border border-border">
                        <img
                            src={frontmatter.image}
                            alt={frontmatter.title}
                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2s]"
                        />
                    </div>
                )}

                <div className="max-w-3xl">
                    {/* Meta Block: Role | Tech */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20 border-y border-border py-12 uppercase tracking-[0.1em] font-extralight">
                        <div>
                            <span className="block text-primary/30 text-[10px] mb-4">Role</span>
                            <span className="text-primary text-sm">{frontmatter.role}</span>
                        </div>
                        <div>
                            <span className="block text-primary/30 text-[10px] mb-4">Tech Stack</span>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-primary text-sm">
                                {frontmatter.tech.map((t, i) => (
                                    <span key={t}>
                                        {t}{i < frontmatter.tech.length - 1 ? "," : ""}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MDX Content */}
                    <div className="prose prose-blue max-w-none font-extralight prose-headings:font-extralight prose-headings:tracking-tight prose-headings:text-primary prose-p:font-extralight prose-p:text-primary/70 prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:font-extralight prose-a:underline prose-a:underline-offset-8 prose-a:decoration-border hover:prose-a:decoration-primary transition-all">
                        <MDXRemote source={content} />
                    </div>
                </div>
            </div>
        </article>
    );
}
