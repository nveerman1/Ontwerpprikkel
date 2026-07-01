import CustomDropdown, { CustomDropdownOption } from "@/components/CustomDropdown";

export type { CustomDropdownOption as DropdownOption };

interface DropdownProps {
  label: string;
  value: string;
  options: CustomDropdownOption[];
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
  return (
    <CustomDropdown
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      className={className}
    />
  );
}
