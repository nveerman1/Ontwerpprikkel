import { ImprovementAction } from "@/data/improvementRules";
import { Idea } from "@/types/generator";

const endings: Record<ImprovementAction, string> = {
  "Maak realistischer": "Werk het uit met kosten, onderhoud en concrete plaatsing.",
  "Maak concreter": "Maak het testbaar met een schaalmodel en drie concrete succescriteria.",
  "Maak technischer": "Voeg een zichtbaar technisch werkingsprincipe toe en benoem onderdelen.",
  "Maak duurzamer": "Gebruik herbruikbare materialen en ontwerp voor reparatie.",
  "Maak eenvoudiger": "Beperk het tot één kernfunctie die binnen één lesuur testbaar is.",
  "Maak gekker": "Voeg een onverwachte draai toe, maar houd het nog uitvoerbaar.",
  "Maak geschikt voor bovenbouw": "Onderbouw met stakeholders, PvE en een testplan.",
};

export const improveIdea = (idea: Idea, action: ImprovementAction): Idea => ({
  ...idea,
  sentence: `${idea.sentence} ${endings[action]}`,
});
