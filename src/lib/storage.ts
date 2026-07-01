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

export const persistSavedIdeas = (ideas: SavedIdea[]) => {
  if (!isAvailable()) return false;

  try {
    window.localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(ideas));
    return true;
  } catch {
    return false;
  }
};
