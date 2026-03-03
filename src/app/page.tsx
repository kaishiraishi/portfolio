import { getAllWorks } from "@/lib/works";
import WorksList from "@/components/WorksList";

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <div className="pt-32 pb-32">
      <WorksList works={works} />
    </div>
  );
}
