import { SavedIdea } from "@/types/generator";

export const SAVED_IDEAS_KEY = "ontwerpprikkel.savedIdeas.v4";

const isAvailable = () => typeof window !== "undefined" && !!window.localStorage;

export const loadSavedIdeas = (): SavedIdea[] => {
  if (!isAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(SAVED_IDEAS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedIdea[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export type PersistResult = "success" | "quota_exceeded" | "unavailable";

export const persistSavedIdeas = (ideas: SavedIdea[]): PersistResult => {
  if (!isAvailable()) return "unavailable";

  try {
    window.localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(ideas));
    return "success";
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      return "quota_exceeded";
    }
    return "unavailable";
  }
};
