import { workforms } from "@/data/workforms";
import WorkformPanel from "@/components/WorkformPanel";
import WorkformPicker from "@/components/WorkformPicker";

interface WorkformRailProps {
  selectedWorkformId: string;
  onSelectWorkform: (id: string) => void;
}

export default function WorkformRail({
  selectedWorkformId,
  onSelectWorkform,
}: WorkformRailProps) {
  const selected =
    workforms.find((item) => item.id === selectedWorkformId) ?? null;

  return (
    <aside className="flex w-full flex-col gap-3 self-stretch">
      <WorkformPicker
        selectedWorkformId={selectedWorkformId}
        onChange={onSelectWorkform}
      />
      <WorkformPanel workform={selected} />
    </aside>
  );
}
