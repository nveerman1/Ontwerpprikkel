import CustomDropdown, {
  CustomDropdownOption,
} from "@/components/CustomDropdown";

export type { CustomDropdownOption as DropdownOption };

interface DropdownProps {
  label: string;
  value: string;
  options: CustomDropdownOption[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  className,
  disabled = false,
}: DropdownProps) {
  return (
    <CustomDropdown
      disabled={disabled}
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      className={className}
    />
  );
}
