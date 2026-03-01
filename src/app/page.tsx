import { getAllWorks } from "@/lib/works";
import Link from "next/link";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="py-12">
      {works.length === 0 ? (
        <p className="text-gray-400 font-extralight text-xs tracking-widest uppercase">No works found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-100">
          {works.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/works/${slug}`}
              className="group block border-r border-b border-gray-100 hover:bg-gray-50 transition-all duration-500 overflow-hidden"
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

                {/* Info Section */}
                <div className="p-10 space-y-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-extralight tracking-tighter text-black leading-tight">
                      {frontmatter.title}
                    </h2>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-extralight">
                      {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                    </span>
                  </div>
                  {frontmatter.summary && (
                    <p className="text-xs text-gray-400 leading-relaxed font-extralight max-w-sm tracking-wide">
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
