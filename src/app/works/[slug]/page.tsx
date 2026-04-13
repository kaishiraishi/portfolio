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
        <article className="max-w-[1152px] mx-auto py-20 font-extralight text-primary">
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

            {/* ─ Author SNS Footer ─ */}
            <div className="mt-32 pt-8 border-t border-[#999999]/30 flex justify-center">
                <div className="flex gap-6">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-[#999999]/60 hover:text-black/60 hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-[#999999]/60 hover:text-black/60 hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126C21.319 1.347 20.651.935 19.886.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.227.415-1.265.058-1.644-.07-4.85-.07-3.204 0-3.586-.015-4.85-.074-1.171-.061-1.806-.256-2.228-.421a3.81 3.81 0 0 1-1.382-.899 3.743 3.743 0 0 1-.896-1.38c-.164-.42-.36-1.065-.415-2.227-.058-1.265-.07-1.644-.07-4.85 0-3.204.015-3.586.074-4.85.061-1.171.256-1.806.421-2.228a3.81 3.81 0 0 1 .899-1.382 3.744 3.744 0 0 1 1.38-.896c.42-.164 1.065-.36 2.227-.415 1.265-.058 1.644-.07 4.85-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm5.882-10.375a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#999999]/60 hover:text-black/60 hover:scale-110 transition-all duration-300">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    );
}
