import { ConstraintMode } from "@/types/generator";

export interface ConstraintOption {
  value: ConstraintMode;
  label: string;
}

export const constraintOptions: ConstraintOption[] = [
  { value: "random", label: "Verrassend/random" },
  { value: "fastPrototype", label: "Snel prototype" },
  { value: "withoutApp", label: "Zonder app" },
  { value: "withoutPower", label: "Zonder stroom" },
  { value: "recycledMaterial", label: "Restmateriaal" },
  { value: "mechanical", label: "Mechanisch/low-tech" },
  { value: "maxTenEuro", label: "Maximaal 10 euro" },
  { value: "waterResistant", label: "Waterbestendig" },
  { value: "foldable", label: "Inklapbaar/verplaatsbaar" },
  { value: "scaleModelSafe", label: "Veilig te testen met schaalmodel" },
];

export const constraintLabel = (value: ConstraintMode) =>
  constraintOptions.find((item) => item.value === value)?.label ?? value;
