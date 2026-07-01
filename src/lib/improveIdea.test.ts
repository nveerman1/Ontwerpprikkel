import { describe, it, expect } from "vitest";
import { improveIdea } from "@/lib/improveIdea";
import { improvementOptions } from "@/data/improvementRules";
import { Idea } from "@/types/generator";

const makeIdea = (): Idea => ({
  id: "test-id-1",
  createdAt: "2025-01-01T00:00:00.000Z",
  segments: {
    productForm: { id: "pf-1", text: "houder", directions: ["sustainability"] },
    audience: {
      id: "au-1",
      text: "leerlingen",
      directions: ["sustainability"],
    },
    problem: {
      id: "pr-1",
      text: "organisatie",
      directions: ["sustainability"],
    },
    market: { id: "ma-1", text: "school", directions: ["sustainability"] },
    constraint: {
      id: "co-1",
      text: "herbruikbaar is",
      directions: ["sustainability"],
    },
  },
  sentence: "Ontwerp een houder voor leerlingen.",
  input: {},
  signature: "pf-1|au-1|pr-1|ma-1|co-1",
});

describe("improveIdea", () => {
  it.each(improvementOptions)(
    'action "%s" returns a new idea with extended sentence',
    (action) => {
      const original = makeIdea();
      const improved = improveIdea(original, action);
      expect(improved).toBeDefined();
      expect(improved.sentence).not.toBe(original.sentence);
      expect(improved.sentence.startsWith(original.sentence)).toBe(true);
    },
  );

  it("does not mutate the original idea", () => {
    const original = makeIdea();
    const originalSentence = original.sentence;
    improveIdea(original, "Maak realistischer");
    expect(original.sentence).toBe(originalSentence);
  });

  it("preserves id, signature, and createdAt", () => {
    const original = makeIdea();
    const improved = improveIdea(original, "Maak concreter");
    expect(improved.id).toBe(original.id);
    expect(improved.signature).toBe(original.signature);
    expect(improved.createdAt).toBe(original.createdAt);
  });

  it("appends action-specific text to sentence", () => {
    const original = makeIdea();
    const improved = improveIdea(original, "Maak duurzamer");
    expect(improved.sentence).toContain("herbruikbare materialen");
  });
});
