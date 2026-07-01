"use client";

import { useMemo } from "react";
import { workforms } from "@/data/workforms";
import { WorkformCategory } from "@/types/generator";
import CustomDropdown from "@/components/CustomDropdown";

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
  const options = useMemo(
    () =>
      workforms.map((workform) => ({
        value: workform.id,
        label: workform.title,
        group: categoryLabel[workform.category],
      })),
    [],
  );

  return (
    <CustomDropdown
      label="Kies werkvorm"
      value={selectedWorkformId}
      options={options}
      onChange={onChange}
    />
  );
}
