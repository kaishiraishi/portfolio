import { getAllWorks } from "@/lib/works";
import Link from "next/link";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="py-12">
      {works.length === 0 ? (
        <p className="text-gray-400 font-extralight text-xs tracking-widest uppercase">No works found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {works.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/works/${slug}`}
              className="group block border border-gray-100 hover:bg-gray-50 transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col h-full min-h-[480px]">
                {/* Image Section */}
                <div className="flex-1 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                  {frontmatter.image ? (
                    <img
                      src={frontmatter.image}
                      alt={frontmatter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-100 font-extralight text-8xl">
                      {frontmatter.title.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-4 border-t border-border group-hover:bg-primary/5 transition-colors">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-extralight tracking-tighter text-primary leading-tight">
                      {frontmatter.title}
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.1em] text-primary/50 font-extralight">
                      {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                    </span>
                  </div>
                  {frontmatter.summary && (
                    <p className="text-xs text-primary/70 leading-relaxed font-extralight max-w-sm tracking-wide">
                      {frontmatter.summary}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
