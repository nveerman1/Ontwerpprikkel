import { Direction, DirectionGroup } from "@/types/generator";

export interface DirectionOption {
  value: Direction;
  label: string;
  group: DirectionGroup;
  description?: string;
}

export const directionOptions: DirectionOption[] = [
  {
    value: "schoolEnvironment",
    label: "Schoolomgeving",
    group: "school",
    description: "Aula, lokaal, pauze, kluisjes",
  },
  {
    value: "makerSpace",
    label: "MakerSpace",
    group: "school",
    description: "Prototypen, gereedschap, opruimen",
  },
  {
    value: "breakAndCafeteria",
    label: "Pauze & aula",
    group: "school",
    description: "Drukte, afval, rust",
  },
  {
    value: "bikeStorage",
    label: "Fietsenstalling",
    group: "school",
    description: "Routes, veiligheid, parkeren",
  },
  {
    value: "classroomLayout",
    label: "Lokaal/inrichting",
    group: "school",
    description: "Inrichting, werkplekken, focus",
  },

  {
    value: "humanHealth",
    label: "Mens & Gezondheid",
    group: "worldsOfTechnology",
  },
  {
    value: "energyWaterSafety",
    label: "Energie, Water & Veiligheid",
    group: "worldsOfTechnology",
  },
  {
    value: "foodNature",
    label: "Voeding & Natuur",
    group: "worldsOfTechnology",
  },
  {
    value: "livingWorkTraffic",
    label: "Wonen, Werken & Verkeer",
    group: "worldsOfTechnology",
  },
  {
    value: "designProductionTrade",
    label: "Ontwerp, Productie & Wereldhandel",
    group: "worldsOfTechnology",
  },
  {
    value: "digitalMediaEntertainment",
    label: "Digitaal, Media & Entertainment",
    group: "worldsOfTechnology",
  },
  {
    value: "highTechScience",
    label: "Hi-tech & Science",
    group: "worldsOfTechnology",
  },
];

export const directionGroupLabel: Record<DirectionGroup, string> = {
  school: "Schoolcontext",
  worldsOfTechnology: "7 werelden van techniek",
};

export const directionLabel = (value: Direction) =>
  directionOptions.find((item) => item.value === value)?.label ?? value;
