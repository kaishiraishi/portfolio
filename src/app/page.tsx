import { getAllWorks } from "@/lib/works";
import Link from "next/link";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">WORKS</h1>

      {works.length === 0 ? (
        <p className="text-gray-500">No works found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/works/${slug}`}
              className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {frontmatter.title}
              </h2>
              {frontmatter.summary && (
                <p className="mt-2 text-gray-600">
                  {frontmatter.summary}
                </p>
              )}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
