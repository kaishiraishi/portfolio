import { getAllWorks } from "@/lib/works";
import WorksList from "@/components/WorksList";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="h-[calc(100vh-160px)] flex items-center overflow-hidden -mt-8">
      {/* ─ Works list ─ */}
      <div className="w-full">
        <WorksList works={works} />
      </div>
    </div>
  );
}
