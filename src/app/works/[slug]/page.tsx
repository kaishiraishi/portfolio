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
        <article className="max-w-prose mx-auto py-8">
            <div className="mb-8">
                <Link href="/" className="text-gray-500 hover:text-black transition-colors text-sm mb-6 inline-block">
                    &larr; Back to Works
                </Link>
                <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">{frontmatter.title}</h1>
                {frontmatter.date && (
                    <p className="text-gray-500 mb-4">{new Date(frontmatter.date).toLocaleDateString()}</p>
                )}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {frontmatter.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="flex gap-4 mb-8">
                    {frontmatter.repo && (
                        <a href={frontmatter.repo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub Repo
                        </a>
                    )}
                    {frontmatter.demo && (
                        <a href={frontmatter.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Live Demo
                        </a>
                    )}
                </div>
                <hr className="border-gray-200" />
            </div>
            <div className="prose prose-gray max-w-none">
                <MDXRemote source={content} />
            </div>
        </article>
    );
}
