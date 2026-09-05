import { describe, it, expect } from "vitest";
import { scoreCombination, selectCandidate } from "@/lib/coherence";
import {
  productForms,
  audiences,
  markets,
  problems,
} from "@/data/generatorData";
import { CategoryItem, IdeaSegments, SurpriseLevel } from "@/types/generator";
const item = (items: CategoryItem[], id: string) =>
  items.find((i) => i.id === id)!;
const coherent: IdeaSegments = {
  productForm: item(productForms, "pf-protobot-voetbal"),
  audience: item(audiences, "au-basisschool"),
  problem: item(problems, "pr-beweging"),
  market: item(markets, "ma-schoolplein"),
};
describe("semantic coherence", () => {
  it("scores football, children, movement and playground above disconnected items", () => {
    const disconnected = {
      ...coherent,
      audience: item(audiences, "au-ouderen"),
      problem: item(problems, "pr-voedsel"),
      market: item(markets, "ma-badkamer"),
    };
    expect(scoreCombination(coherent)).toBeGreaterThan(
      scoreCombination(disconnected),
    );
  });
  it("recognizes the creative anchor in football, food waste and playground", () => {
    const surprising = { ...coherent, problem: item(problems, "pr-voedsel") };
    expect(scoreCombination(surprising)).toBeGreaterThan(0);
    expect(scoreCombination(surprising)).toBeLessThan(
      scoreCombination(coherent),
    );
  });
  it("missing tags are neutral and do not crash", () => {
    const unknown: CategoryItem = {
      id: "unknown",
      text: "unknown",
      directions: [],
    };
    expect(
      scoreCombination({
        productForm: unknown,
        audience: unknown,
        problem: unknown,
      }),
    ).toBe(0.5);
  });
  it("constraint does not change the score and omitted context normalizes active weights", () => {
    expect(
      scoreCombination({ ...coherent, constraint: coherent.audience }),
    ).toBe(scoreCombination(coherent));
    expect(scoreCombination({ ...coherent, market: undefined })).toBeCloseTo(
      1 / 3,
    );
  });
  it("all curated data has tags and all contexts have phrases", () => {
    for (const i of [
      ...productForms.filter((p) => !p.tags?.includes("protobot")),
      ...audiences,
      ...markets,
      ...problems,
    ])
      expect(i.semanticTags?.length).toBeGreaterThan(0);
    for (const m of markets) expect(m.contextPhrase).toBeTruthy();
    expect(
      productForms.filter(
        (p) => p.tags?.includes("protobot") && p.semanticTags?.length,
      ).length,
    ).toBeGreaterThanOrEqual(12);
  });
});
describe("surprise selection", () => {
  const candidates = Array.from({ length: 40 }, (_, i) => ({
    score: (i + 1) / 40,
  }));
  it.each([0, 0.25, 0.5, 0.99])(
    "orders bands for random value %s",
    (random) => {
      const score = (level: SurpriseLevel) =>
        selectCandidate(candidates, level, () => random)!.score;
      expect(score("logical")).toBeGreaterThan(score("balanced"));
      expect(score("balanced")).toBeGreaterThan(score("wild"));
    },
  );
  it("varies within the band", () => {
    expect(selectCandidate(candidates, "balanced", () => 0)).not.toEqual(
      selectCandidate(candidates, "balanced", () => 0.99),
    );
  });
  it("handles empty and tied pools", () => {
    expect(selectCandidate([], "wild")).toBeNull();
    expect(selectCandidate([{ score: 0.5 }], "logical")).toEqual({
      score: 0.5,
    });
  });
  it("prefers some semantic connection over zero when available", () => {
    expect(
      selectCandidate([{ score: 0 }, { score: 0.2 }], "wild", () => 0)?.score,
    ).toBe(0.2);
  });
});
