import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  className,
}: DropdownProps) {
  const grouped = options.reduce<Record<string, DropdownOption[]>>((acc, option) => {
    const key = option.group ?? "";
    acc[key] = [...(acc[key] ?? []), option];
    return acc;
  }, {});

  const groups = Object.entries(grouped);

  return (
    <label className={cn("flex items-center gap-2 rounded-xl border border-white/15 bg-white/12 px-3 py-2 text-sm font-extrabold text-white", className)}>
      <span className="whitespace-nowrap">{label}</span>
      <select
        className="min-w-0 bg-transparent text-white outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {groups.map(([group, groupOptions]) =>
          group ? (
            <optgroup key={group} label={group}>
              {groupOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ) : (
            groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ),
        )}
      </select>
    </label>
  );
}
