"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CustomDropdownOption {
  value: string;
  label: string;
  description?: string;
  group?: string;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  options: CustomDropdownOption[];
  onChange: (value: string) => void;
  /** If true, selecting resets value to "" after calling onChange (action-style dropdown) */
  actionMode?: boolean;
  /** Optional icon/emoji shown before the label */
  icon?: string;
  className?: string;
}

export default function CustomDropdown({
  label,
  value,
  options,
  onChange,
  actionMode = false,
  icon,
  className,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = actionMode
    ? label
    : `${label} ${selectedOption?.label ?? ""}`;

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Group options
  const grouped = options.reduce<Record<string, CustomDropdownOption[]>>(
    (acc, option) => {
      const key = option.group ?? "";
      acc[key] = [...(acc[key] ?? []), option];
      return acc;
    },
    {},
  );
  const groups = Object.entries(grouped);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-[14px] border border-white/16 bg-white/13 px-3 py-2 text-sm font-[850] text-white transition-colors hover:bg-white/20"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="whitespace-nowrap">{icon && <span className="mr-1">{icon}</span>}{displayLabel}</span>
        <span className="ml-1 text-xs" aria-hidden="true">▼</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-[100] max-h-[440px] min-w-[310px] overflow-y-auto rounded-[18px] border border-black/5 bg-[#fff8f1] p-2.5 text-[#25282d] shadow-[0_20px_70px_rgba(45,24,18,.22)] max-md:fixed max-md:left-4 max-md:right-4 max-md:min-w-0"
        >
          {groups.map(([group, groupOptions]) => (
            <div key={group || "__ungrouped"}>
              {group && (
                <div className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-[.06em] text-[#9b5c48]">
                  {group}
                </div>
              )}
              {groupOptions.map((option) => {
                const isSelected = !actionMode && option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-[850] transition-colors hover:bg-[#ffe7d8]",
                      isSelected && "bg-[#ffe7d8]",
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <div>
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="mt-0.5 block text-xs font-normal text-[#777]">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <span
                        className="ml-2 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-lg border-2 border-[#e0b09a] text-sm font-[950] text-[#c9563a]"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
