import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  loadSavedIdeas,
  persistSavedIdeas,
  SAVED_IDEAS_KEY,
} from "@/lib/storage";
import { SavedIdea } from "@/types/generator";

const makeSavedIdea = (id = "saved-1"): SavedIdea => ({
  id,
  createdAt: "2025-01-01T00:00:00.000Z",
  savedAt: "2025-01-01T00:00:01.000Z",
  segments: {
    productForm: {
      id: "pf-1",
      text: "houder",
      directions: ["energyWaterSafety"],
    },
    audience: {
      id: "au-1",
      text: "leerlingen",
      directions: ["energyWaterSafety"],
    },
    problem: {
      id: "pr-1",
      text: "organisatie",
      directions: ["energyWaterSafety"],
    },
    market: { id: "ma-1", text: "school", directions: ["energyWaterSafety"] },
    constraint: {
      id: "co-1",
      text: "herbruikbaar is",
      directions: ["energyWaterSafety"],
    },
  },
  sentence: "Ontwerp een houder.",
  input: {},
  signature: "pf-1|au-1|pr-1|ma-1|co-1",
});

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("loadSavedIdeas", () => {
    it("returns [] when nothing is stored", () => {
      expect(loadSavedIdeas()).toEqual([]);
    });

    it("loads valid saved JSON", () => {
      const ideas = [makeSavedIdea()];
      localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(ideas));
      expect(loadSavedIdeas()).toEqual(ideas);
    });

    it("returns [] for corrupt JSON", () => {
      localStorage.setItem(SAVED_IDEAS_KEY, "not-valid-json{{{");
      expect(loadSavedIdeas()).toEqual([]);
    });

    it("returns [] when parsed value is not an array", () => {
      localStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify({ foo: "bar" }));
      expect(loadSavedIdeas()).toEqual([]);
    });
  });

  describe("persistSavedIdeas", () => {
    it("stores ideas and returns success", () => {
      const ideas = [makeSavedIdea()];
      const result = persistSavedIdeas(ideas);
      expect(result).toBe("success");
      expect(localStorage.getItem(SAVED_IDEAS_KEY)).toBe(JSON.stringify(ideas));
    });

    it('returns "unavailable" when localStorage is not available', () => {
      vi.spyOn(window, "localStorage", "get").mockReturnValue(
        undefined as unknown as Storage,
      );
      expect(persistSavedIdeas([makeSavedIdea()])).toBe("unavailable");
    });

    it('returns "quota_exceeded" on QuotaExceededError', () => {
      const error = new DOMException("quota exceeded", "QuotaExceededError");
      vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw error;
      });
      expect(persistSavedIdeas([makeSavedIdea()])).toBe("quota_exceeded");
    });
  });
});
