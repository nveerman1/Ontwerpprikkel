export type AssignmentType =
  "product" | "system" | "space" | "technicalDesign" | "researchIdea";

export type DirectionGroup = "school" | "societal" | "worldsOfTechnology";

export type ConstraintMode =
  | "random"
  | "fastPrototype"
  | "withoutApp"
  | "withoutPower"
  | "recycledMaterial"
  | "mechanical"
  | "maxTenEuro"
  | "waterResistant"
  | "foldable"
  | "scaleModelSafe";

export type Direction =
  | "schoolEnvironment"
  | "makerSpace"
  | "breakAndCafeteria"
  | "bikeStorage"
  | "classroomLayout"
  | "sustainability"
  | "healthcare"
  | "sports"
  | "mobility"
  | "housingAndSpace"
  | "humanHealth"
  | "energyWaterSafety"
  | "foodNature"
  | "livingWorkTraffic"
  | "designProductionTrade"
  | "digitalMediaEntertainment"
  | "highTechScience";

export interface CategoryItem {
  id: string;
  text: string;
  directions: Direction[];
  typeCompatibility?: AssignmentType[];
  constraintModes?: ConstraintMode[];
  tags?: string[];
}

export interface GeneratorInput {
  type?: AssignmentType;
  direction?: Direction;
  constraintMode?: ConstraintMode;
}

export interface IdeaSegments {
  productForm: CategoryItem;
  audience: CategoryItem;
  problem: CategoryItem;
  market: CategoryItem;
  constraint: CategoryItem;
}

export type IdeaSegmentKey = keyof IdeaSegments;

export interface Idea {
  id: string;
  segments: IdeaSegments;
  sentence: string;
  createdAt: string;
  input: GeneratorInput;
  signature: string;
  selectedWorkformId?: string;
  usedFallback?: boolean;
}

export type WorkformCategory =
  "ideation" | "problem" | "design" | "testing" | "presentation";

export interface Workform {
  id: string;
  title: string;
  category: WorkformCategory;
  shortDescription: string;
  durationMinutes: number;
  goal: string;
  steps: string[];
  output: string;
  reflectionQuestions: string[];
}

export interface SavedIdea extends Idea {
  savedAt: string;
}
