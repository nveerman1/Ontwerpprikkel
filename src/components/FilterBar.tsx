import { improvementOptions } from "@/data/improvementRules";
import { AssignmentType, ConstraintMode, Direction } from "@/types/generator";
import Dropdown, { DropdownOption } from "@/components/Dropdown";
import CustomDropdown from "@/components/CustomDropdown";

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
}

const improveDropdownOptions = improvementOptions.map((item) => ({
  value: item,
  label: item,
}));

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
}: FilterBarProps) {
  return (
    <nav className="relative z-50 flex flex-wrap items-center gap-2 border-b border-white/10 bg-black/5 px-4 py-4 md:px-7">
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

      <button
        className="rounded-[14px] border border-white/16 bg-white/13 px-3 py-2 text-sm font-[850] text-white hover:bg-white/20"
        onClick={onClearLocks}
      >
        🔓 Slotjes wissen
      </button>
      <button
        className="rounded-[14px] border border-white/16 bg-white/13 px-3 py-2 text-sm font-[850] text-white hover:bg-white/20"
        onClick={onResetFilters}
      >
        Reset filters
      </button>

      <div className="mx-1 hidden h-8 w-px bg-white/20 lg:block" />

      <button
        className="rounded-[14px] bg-white px-3 py-2 text-sm font-[850] text-[#c9563a] shadow-[0_4px_16px_rgba(45,24,18,.12)]"
        onClick={onNewChallenge}
      >
        ↻ Nieuwe uitdaging
      </button>
      <CustomDropdown
        label="Maak beter"
        value=""
        options={improveDropdownOptions}
        onChange={(value) =>
          onImprove(value as (typeof improvementOptions)[number])
        }
        actionMode
        icon="✨"
      />
    </nav>
  );
}
