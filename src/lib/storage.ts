import { CategoryItem, SavedIdea } from "@/types/generator";

import { markets, constraints } from "@/data/generatorData";
import { formatIdeaSentence, ideaSignature } from "@/lib/formatIdea";

export const SAVED_IDEAS_KEY = "ontwerpprikkel.savedIdeas.v5";

const isAvailable = () =>
  typeof window !== "undefined" && !!window.localStorage;

const isItem = (value: unknown): value is CategoryItem => {
  if (!value || typeof value !== "object") return false;
  const item = value as CategoryItem;
  return (
    typeof item.id === "string" &&
    typeof item.text === "string" &&
    Array.isArray(item.directions) &&
    item.directions.every((d) => typeof d === "string") &&
    [
      item.tags,
      item.semanticTags,
      item.typeCompatibility,
      item.constraintModes,
    ].every(
      (list) =>
        list === undefined ||
        (Array.isArray(list) && list.every((v) => typeof v === "string")),
    ) &&
    (item.contextPhrase === undefined || typeof item.contextPhrase === "string")
  );
};
const isSavedIdea = (value: unknown): value is SavedIdea => {
  if (!value || typeof value !== "object") return false;
  const idea = value as SavedIdea;
  return (
    typeof idea.id === "string" &&
    typeof idea.sentence === "string" &&
    typeof idea.signature === "string" &&
    typeof idea.savedAt === "string" &&
    typeof idea.createdAt === "string" &&
    (idea.input?.surpriseLevel === undefined ||
      ["logical", "balanced", "wild"].includes(idea.input.surpriseLevel)) &&
    !!idea.input &&
    typeof idea.input === "object" &&
    !!idea.segments &&
    [
      idea.segments.productForm,
      idea.segments.audience,
      idea.segments.problem,
    ].every(isItem) &&
    [idea.segments.market, idea.segments.constraint].every(
      (item) => item === undefined || isItem(item),
    ) &&
    (idea.improvements === undefined ||
      (Array.isArray(idea.improvements) &&
        idea.improvements.every((v) => typeof v === "string")))
  );
};
const migrateIdea = (idea: SavedIdea): SavedIdea => {
  if (!idea.sentence.includes("dat helpt bij")) return idea;
  const segments = { ...idea.segments };
  if (segments.market)
    segments.market =
      markets.find((m) => m.id === segments.market!.id) ?? segments.market;
  if (segments.constraint)
    segments.constraint =
      constraints.find((c) => c.id === segments.constraint!.id) ??
      segments.constraint;
  return {
    ...idea,
    segments,
    sentence: formatIdeaSentence(segments),
    signature: ideaSignature(segments),
  };
};

export const loadSavedIdeas = (): SavedIdea[] => {
  try {
    if (!isAvailable()) return [];
    const raw = window.localStorage.getItem(SAVED_IDEAS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isSavedIdea).map(migrateIdea)
      : [];
  } catch {
    return [];
  }
};

export type PersistResult = "success" | "quota_exceeded" | "unavailable";

export const persistSavedIdeas = (ideas: SavedIdea[]): PersistResult => {
  try {
    if (!isAvailable()) return "unavailable";
    window.localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(ideas));
    return "success";
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      return "quota_exceeded";
    }
    return "unavailable";
  }
};
