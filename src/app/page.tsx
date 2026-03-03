import { getAllWorks } from "@/lib/works";
import WorksList from "@/components/WorksList";
import AsciiVideo from "@/components/AsciiVideo";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div>
      {/* ─ Hero: ASCII video ─ */}
      <section className="w-full min-h-screen flex items-center justify-center">
        <AsciiVideo src="/video.mp4" width={1280} height={720} />
      </section>

      {/* ─ Works list ─ */}
      <div className="pt-32 pb-32">
        <WorksList works={works} />
      </div>
    </div>
  );
}
