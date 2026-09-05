import { GeneratorInput } from "@/types/generator";
export const defaultInput: GeneratorInput = {
  type: "product",
  contextEnabled: true,
  constraintEnabled: true,
  surpriseLevel: "balanced",
};
export const GENERATION_FAILURE =
  "Geen goede combinatie gevonden met deze filters. Verruim een richting of randvoorwaarde, of wis een slotje.";
