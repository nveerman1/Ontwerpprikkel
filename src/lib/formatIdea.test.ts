import { describe, it, expect } from "vitest";
import { formatIdeaSentence, ideaSignature } from "@/lib/formatIdea";
import { IdeaSegments } from "@/types/generator";

const makeSegments = (overrides?: Partial<IdeaSegments>): IdeaSegments => ({
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
  ...overrides,
});

describe("formatIdeaSentence", () => {
  it("creates a readable Dutch sentence", () => {
    const segments = makeSegments();
    const sentence = formatIdeaSentence(segments);
    expect(sentence).toContain("Ontwerp een");
    expect(sentence).toContain("houder");
    expect(sentence).toContain("leerlingen");
    expect(sentence).toContain("organisatie");
    expect(sentence).toContain("school");
    expect(sentence).toContain("herbruikbaar is");
  });

  it("uses all segment text values in the sentence", () => {
    const segments = makeSegments({
      productForm: {
        id: "pf-x",
        text: "bouwpakket",
        directions: ["livingWorkTraffic"],
      },
    });
    const sentence = formatIdeaSentence(segments);
    expect(sentence).toContain("bouwpakket");
  });
});

describe("ideaSignature", () => {
  it("is stable for the same segments", () => {
    const segments = makeSegments();
    expect(ideaSignature(segments)).toBe(ideaSignature(segments));
  });

  it("differs for different segments", () => {
    const a = makeSegments();
    const b = makeSegments({
      productForm: {
        id: "pf-different",
        text: "sensor",
        directions: ["energyWaterSafety"],
      },
    });
    expect(ideaSignature(a)).not.toBe(ideaSignature(b));
  });

  it("produces a pipe-separated string of ids", () => {
    const segments = makeSegments();
    expect(ideaSignature(segments)).toBe("pf-1|au-1|pr-1|ma-1|co-1");
  });
});
