import { getAllWorks } from "@/lib/works";
import Link from "next/link";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="space-y-24">
      <section>
        <h1 className="text-[10px] font-extralight tracking-[0.4em] uppercase mb-16 text-gray-300">Selected Works</h1>

        {works.length === 0 ? (
          <p className="text-gray-500 font-extralight">No works found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {works.map(({ slug, frontmatter }) => (
              <Link
                key={slug}
                href={`/works/${slug}`}
                className="group block space-y-6"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative border border-gray-100/50">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-extralight text-6xl group-hover:scale-105 transition-transform duration-700 ease-out">
                    {frontmatter.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-extralight tracking-tight group-hover:text-gray-600 transition-colors">
                    {frontmatter.title}
                  </h2>
                  {frontmatter.summary && (
                    <p className="text-xs text-gray-400 leading-relaxed font-extralight tracking-wide line-clamp-2">
                      {frontmatter.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
