import { getWorkBySlug, getAllWorks } from "@/lib/works";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { MDXRemote } from "next-mdx-remote/rsc";
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
        <article className="max-w-[1152px] mx-auto px-4 md:px-8 py-20 font-extralight text-primary">
            <div className="grid grid-cols-8 gap-x-12 gap-y-24">
                {/* ─ Left: Visuals Row/Col ─ */}
                <div className="col-span-8 lg:col-span-5 space-y-16">
                    <ImageGallery 
                        mainImage={frontmatter.image}
                        mainImageCaption={frontmatter.imageCaption}
                        images={frontmatter.images}
                    />

                    {/* YouTube Embed */}
                    {frontmatter.youtubeId && (
                        <div className="w-full aspect-video bg-black relative">
                            <iframe
                                src={`https://www.youtube.com/embed/${frontmatter.youtubeId}`}
                                className="w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>

                {/* ─ Right: Information ─ */}
                <div className="col-span-8 lg:col-span-3 lg:sticky lg:top-12 h-fit">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2 leading-none">
                            {frontmatter.title}
                            <span className="text-[#999999] opacity-80 ml-4 inline-block transform translate-y-[-0.1em] text-xl sm:text-2xl font-extralight">
                                / {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                            </span>
                        </h1>

                        {/* Summary */}
                        {frontmatter.summary && (
                            <p className="mt-8 text-sm font-light leading-relaxed opacity-80 whitespace-pre-line">
                                {frontmatter.summary}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-primary/20 pt-8 mb-0 space-y-2">
                        {/* Metadata Rows */}
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="opacity-80 uppercase tracking-[0.2em] text-xs font-normal">Member</div>
                            <div className="col-span-2 text-primary">{frontmatter.members || '1'}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="opacity-80 uppercase tracking-[0.2em] text-xs font-normal">Category</div>
                            <div className="col-span-2 text-primary">{frontmatter.category || '—'}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="opacity-80 uppercase tracking-[0.2em] text-xs font-normal">Role</div>
                            <div className="col-span-2 text-primary font-normal">{frontmatter.role}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="opacity-80 uppercase tracking-[0.2em] text-xs font-normal">Awards</div>
                            <div className="col-span-2 text-primary font-light whitespace-pre-line">{frontmatter.awards || frontmatter.achievements || '—'}</div>
                        </div>
                    </div>

                    {/* External Links */}
                    {(frontmatter.repo || frontmatter.demo) && (
                        <div className="flex gap-12 mb-16 border-b border-primary/10 pb-8">
                            {frontmatter.repo && (
                                <a href={frontmatter.repo} target="_blank" rel="noopener noreferrer"
                                    className="text-xs uppercase tracking-[0.2em] opacity-100 hover:opacity-50 transition-opacity underline underline-offset-8">
                                    Repository
                                </a>
                            )}
                            {frontmatter.demo && (
                                <a href={frontmatter.demo} target="_blank" rel="noopener noreferrer"
                                    className="text-xs uppercase tracking-[0.2em] opacity-100 hover:opacity-50 transition-opacity underline underline-offset-8">
                                    Live Demo
                                </a>
                            )}
                        </div>
                    )}

                    {/* Main Description (Japanese) */}
                    <div className="prose max-w-none font-light prose-headings:font-normal prose-headings:text-[#777777] prose-h2:text-xl prose-h2:tracking-wider prose-h2:mt-12 prose-h2:mb-2 prose-h2:border-b prose-h2:border-[#777777]/20 prose-h2:pb-1 prose-p:text-[#777777] prose-p:leading-relaxed prose-p:text-sm prose-p:mt-4 prose-p:mb-10 prose-strong:text-[#777777] prose-strong:font-normal prose-ul:text-[#777777] prose-li:text-[#777777]">
                        <MDXRemote source={content} />
                    </div>

                    {/* English Description */}
                    {frontmatter.engDescription && (
                        <div className="mt-16 pt-12 border-t border-primary/20 text-sm leading-relaxed opacity-60 font-light">
                            <p className="whitespace-pre-line leading-relaxed">{frontmatter.engDescription}</p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
