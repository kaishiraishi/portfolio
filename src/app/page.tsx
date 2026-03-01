import { getAllWorks } from "@/lib/works";
import Link from "next/link";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="py-20">
      <div className="flex justify-between items-end mb-16 border-b border-border pb-10">
        <span className="text-[10px] uppercase tracking-[0.1em] text-primary/30 font-extralight">Selected Works</span>
        <span className="text-[10px] uppercase tracking-[0.1em] text-primary/30 font-extralight">Rows: {Math.ceil(works.length / 2)}</span>
      </div>

      {works.length === 0 ? (
        <p className="text-primary/50 font-extralight text-[10px] tracking-[0.1em] uppercase">No works found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {works.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/works/${slug}`}
              className="group block border border-border rounded-none shadow-none hover:bg-primary/[0.02] transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image (Top) */}
              <div className="aspect-[4/3] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                {frontmatter.image ? (
                  <img
                    src={frontmatter.image}
                    alt={frontmatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center text-primary/10 font-extralight text-8xl">
                    {frontmatter.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-10 flex flex-col flex-1">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-3xl font-extralight tracking-tighter text-primary leading-tight group-hover:opacity-70 transition-opacity">
                    {frontmatter.title}
                  </h2>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-primary/40 font-extralight">
                    {frontmatter.date ? new Date(frontmatter.date).getFullYear() : '—'}
                  </span>
                </div>

                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-primary/60 font-extralight border-l border-primary/20 pl-3">
                    {frontmatter.role}
                  </span>
                </div>

                {frontmatter.summary && (
                  <p className="mt-auto text-xs text-primary/70 leading-relaxed font-extralight max-w-sm tracking-wide line-clamp-2">
                    {frontmatter.summary}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
