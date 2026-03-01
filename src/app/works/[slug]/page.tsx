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
                <Link href="/" className="text-[10px] tracking-[0.4em] uppercase text-gray-300 hover:text-black transition-colors mb-20 inline-block font-extralight">
                    &larr; Index
                </Link>
                <h1 className="text-5xl sm:text-7xl font-extralight tracking-tighter mb-16 text-black leading-[0.9]">{frontmatter.title}</h1>

                {frontmatter.image && (
                    <div className="mb-24 aspect-[21/9] overflow-hidden border border-gray-100">
                        <img
                            src={frontmatter.image}
                            alt={frontmatter.title}
                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2s]"
                        />
                    </div>
                )}

                <div className="max-w-3xl">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-12 sm:gap-20 text-[10px] text-gray-400 mb-20 border-y border-gray-50 py-12 uppercase tracking-[0.3em] font-extralight">
                        {frontmatter.date && (
                            <div>
                                <span className="block text-gray-200 mb-3">Released</span>
                                <span className="text-black">{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                            </div>
                        )}
                        {frontmatter.repo && (
                            <div>
                                <span className="block text-gray-200 mb-3">Code</span>
                                <a href={frontmatter.repo} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400 transition-colors underline underline-offset-8 decoration-gray-100">
                                    GitHub Repository
                                </a>
                            </div>
                        )}
                        {frontmatter.demo && (
                            <div>
                                <span className="block text-gray-200 mb-3">Live</span>
                                <a href={frontmatter.demo} target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400 transition-colors underline underline-offset-8 decoration-gray-100">
                                    View Project
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="prose prose-gray max-w-none prose-headings:font-extralight prose-headings:tracking-tight prose-headings:text-black prose-p:font-extralight prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg prose-a:text-black prose-a:font-extralight prose-a:underline prose-a:underline-offset-8 prose-a:decoration-gray-100 hover:prose-a:decoration-black transition-all">
                        <MDXRemote source={content} />
                    </div>
                </div>
            </div>
        </article>
    );
}
