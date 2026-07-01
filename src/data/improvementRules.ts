export const improvementOptions = [
  "Maak realistischer",
  "Maak concreter",
  "Maak technischer",
  "Maak duurzamer",
  "Maak eenvoudiger",
  "Maak gekker",
  "Maak geschikt voor bovenbouw",
] as const;

export type ImprovementAction = (typeof improvementOptions)[number];
