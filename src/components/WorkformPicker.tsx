import { workforms } from "@/data/workforms";
import { WorkformCategory } from "@/types/generator";

interface WorkformPickerProps {
  selectedWorkformId: string;
  onChange: (value: string) => void;
}

const categoryLabel: Record<WorkformCategory, string> = {
  ideation: "Ideeën bedenken",
  problem: "Probleem en gebruiker begrijpen",
  design: "Ontwerp uitwerken",
  testing: "Testen en verbeteren",
  presentation: "Presenteren en kiezen",
};

export default function WorkformPicker({
  selectedWorkformId,
  onChange,
}: WorkformPickerProps) {
  const categories = Object.entries(categoryLabel) as [WorkformCategory, string][];

  return (
    <label className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-extrabold text-white">
      <span>Kies werkvorm</span>
      <select
        className="min-w-0 bg-transparent text-white outline-none"
        value={selectedWorkformId}
        onChange={(event) => onChange(event.target.value)}
      >
        {categories.map(([category, label]) => (
          <optgroup key={category} label={label}>
            {workforms
              .filter((workform) => workform.category === category)
              .map((workform) => (
                <option key={workform.id} value={workform.id}>
                  {workform.title}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
