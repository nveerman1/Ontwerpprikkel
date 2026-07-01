import { improvementOptions } from "@/data/improvementRules";
import { AssignmentType, ConstraintMode, Direction } from "@/types/generator";
import Dropdown, { DropdownOption } from "@/components/Dropdown";

interface FilterBarProps {
  type: AssignmentType;
  direction: Direction;
  constraintMode: ConstraintMode;
  typeOptions: DropdownOption[];
  directionOptions: DropdownOption[];
  constraintOptions: DropdownOption[];
  onTypeChange: (value: AssignmentType) => void;
  onDirectionChange: (value: Direction) => void;
  onConstraintChange: (value: ConstraintMode) => void;
  onClearLocks: () => void;
  onResetFilters: () => void;
  onNewChallenge: () => void;
  onImprove: (action: (typeof improvementOptions)[number]) => void;
  onCopy: () => void;
  onSave: () => void;
}

export default function FilterBar({
  type,
  direction,
  constraintMode,
  typeOptions,
  directionOptions,
  constraintOptions,
  onTypeChange,
  onDirectionChange,
  onConstraintChange,
  onClearLocks,
  onResetFilters,
  onNewChallenge,
  onImprove,
  onCopy,
  onSave,
}: FilterBarProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-black/5 px-4 py-4 md:px-7">
      <Dropdown
        label="Type:"
        value={type}
        options={typeOptions}
        onChange={(value) => onTypeChange(value as AssignmentType)}
      />
      <Dropdown
        label="Richting:"
        value={direction}
        options={directionOptions}
        onChange={(value) => onDirectionChange(value as Direction)}
      />
      <Dropdown
        label="Randvoorwaarde:"
        value={constraintMode}
        options={constraintOptions}
        onChange={(value) => onConstraintChange(value as ConstraintMode)}
      />

      <button className="rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black" onClick={onClearLocks}>
        Slotjes wissen
      </button>
      <button className="rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black" onClick={onResetFilters}>
        Reset filters
      </button>

      <div className="mx-1 hidden h-8 w-px bg-white/20 lg:block" />

      <button className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#c9563a]" onClick={onNewChallenge}>
        Nieuwe uitdaging
      </button>
      <select
        className="rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black text-white"
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onImprove(event.target.value as (typeof improvementOptions)[number]);
          event.target.value = "";
        }}
      >
        <option value="">Maak beter</option>
        {improvementOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button className="rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black" onClick={onCopy}>
        Kopieer
      </button>
      <button className="rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-black" onClick={onSave}>
        Bewaar
      </button>
    </nav>
  );
}
