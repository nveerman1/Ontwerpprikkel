import { describe, it, expect, vi, afterEach } from "vitest";
import { generateIdea, refreshIdeaSegment } from "@/lib/generator";
import { scoreCombination } from "@/lib/coherence";
import { defaultInput } from "@/lib/defaults";
import {
  audiences,
  problems,
  constraints,
  productForms,
} from "@/data/generatorData";
import { GeneratorInput, Idea } from "@/types/generator";
import { isCompatibleCombination, itemMatchesFilters } from "@/lib/rules";
const makeIdea = (input: GeneratorInput = defaultInput): Idea => {
  const idea = generateIdea(input, {}, null, []);
  expect(idea).not.toBeNull();
  return idea!;
};
afterEach(() => vi.restoreAllMocks());
describe("defaults", () => {
  it("starts with unrestricted filters and balanced enabled segments", () => {
    expect(defaultInput).toEqual({
      type: "product",
      contextEnabled: true,
      constraintEnabled: true,
      surpriseLevel: "balanced",
    });
    expect(defaultInput.direction).toBeUndefined();
    expect(defaultInput.constraintMode).toBeUndefined();
  });
});
describe("complete candidate generation", () => {
  it("returns metadata and all enabled segments", () => {
    const idea = makeIdea();
    expect(idea.id).toBeTruthy();
    expect(idea.createdAt).toBeTruthy();
    expect(idea.signature).toBeTruthy();
    expect(idea.sentence).toContain("aan te pakken");
    expect(idea.segments.market).toBeDefined();
    expect(idea.segments.constraint).toBeDefined();
  });
  it.each([undefined, "random"] as const)(
    "uses compatible product constraint metadata for all mode %s",
    (constraintMode) => {
      for (let i = 0; i < 30; i++) {
        const idea = makeIdea({ constraintMode });
        const { productForm, constraint } = idea.segments;
        if (productForm.constraintModes?.length)
          expect(
            constraint?.constraintModes?.some((m) =>
              productForm.constraintModes!.includes(m),
            ),
          ).toBe(true);
        expect(
          constraint?.constraintModes?.every((m) =>
            isCompatibleCombination(idea.segments, m),
          ),
        ).toBe(true);
      }
    },
  );
  it.each(["humanHealth", "energyWaterSafety", "schoolEnvironment"] as const)(
    "never relaxes explicit direction %s",
    (direction) => {
      for (let i = 0; i < 10; i++) {
        const idea = makeIdea({ direction });
        for (const item of Object.values(idea.segments))
          expect(item.directions).toContain(direction);
      }
    },
  );
  it.each([
    "withoutPower",
    "withoutApp",
    "foldable",
    "waterResistant",
  ] as const)("preserves explicit constraint %s", (constraintMode) => {
    for (let i = 0; i < 10; i++) {
      const idea = makeIdea({ constraintMode });
      expect(idea.segments.constraint?.constraintModes).toContain(
        constraintMode,
      );
      expect(isCompatibleCombination(idea.segments, constraintMode)).toBe(true);
    }
  });
  it("returns failure on an empty pool instead of ignoring filters", () => {
    expect(
      generateIdea({ direction: "classroomLayout" }, {}, null, []),
    ).toBeNull();
  });
  it("validates locks against changed filters", () => {
    const first = makeIdea({ direction: "humanHealth" });
    expect(
      generateIdea({ direction: "makerSpace" }, { audience: true }, first, []),
    ).toBeNull();
  });
  it("keeps locks and can reuse a fully locked recent idea", () => {
    const first = makeIdea();
    const locks = {
      productForm: true,
      audience: true,
      problem: true,
      market: true,
      constraint: true,
    };
    const next = generateIdea(defaultInput, locks, first, [first.signature]);
    expect(next?.segments).toEqual(first.segments);
  });
  it.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    "supports context %s and constraint %s",
    (contextEnabled, constraintEnabled) => {
      const idea = makeIdea({ contextEnabled, constraintEnabled });
      expect(!!idea.segments.market).toBe(contextEnabled);
      expect(!!idea.segments.constraint).toBe(constraintEnabled);
    },
  );
  it("ignores disabled constraints even with incompatible filter and lock", () => {
    const first = makeIdea();
    first.segments.productForm = productForms.find(
      (p) => p.id === "pf-modulair-opbergsysteem",
    )!;
    const idea = generateIdea(
      { constraintEnabled: false, constraintMode: "withoutPower" },
      { productForm: true, constraint: true },
      first,
      [],
    );
    expect(idea?.segments.productForm).toEqual(first.segments.productForm);
    expect(idea?.segments.constraint).toBeUndefined();
  });
  it("disabled context does not require a context pool", () => {
    const idea = makeIdea({
      direction: "classroomLayout",
      contextEnabled: false,
      constraintEnabled: false,
    });
    expect(idea.segments.market).toBeUndefined();
  });
  it("avoids recent signatures when alternatives exist", () => {
    const first = makeIdea();
    expect(
      generateIdea(defaultInput, {}, first, [first.signature])?.signature,
    ).not.toBe(first.signature);
  });
  it("does not use a random fallback even with exhausted attempts", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const first = makeIdea({ constraintEnabled: false });
    first.segments.constraint = constraints.find(
      (c) => c.id === "co-zonder-stroom",
    );
    first.segments.productForm = productForms.find(
      (p) => p.id === "pf-modulair-opbergsysteem",
    )!;
    expect(
      generateIdea({}, { productForm: true, constraint: true }, first, []),
    ).toBeNull();
  });
});
describe("refresh", () => {
  it("preserves other segments and id while changing the requested segment", () => {
    const original = makeIdea({
      contextEnabled: false,
      constraintEnabled: false,
    });
    const next = refreshIdeaSegment("problem", original.input, original);
    expect(next).not.toBeNull();
    expect(next?.segments.problem.id).not.toBe(original.segments.problem.id);
    expect(next?.segments.productForm).toEqual(original.segments.productForm);
    expect(next?.segments.audience).toEqual(original.segments.audience);
    expect(next?.id).toBe(original.id);
  });
  it("does not refresh a locked or disabled segment", () => {
    const idea = makeIdea({ contextEnabled: false });
    expect(
      refreshIdeaSegment("productForm", idea.input, idea, {
        productForm: true,
      }),
    ).toBe(idea);
    expect(refreshIdeaSegment("market", idea.input, idea)).toBe(idea);
  });
  it("reports impossible refresh instead of relaxing filters", () => {
    const idea = makeIdea({ direction: "humanHealth" });
    expect(
      refreshIdeaSegment("problem", { direction: "makerSpace" }, idea),
    ).toBeNull();
  });
  it("applies filters and compatibility to refreshed products", () => {
    const idea = makeIdea({
      direction: "schoolEnvironment",
      constraintMode: "fastPrototype",
    });
    const next = refreshIdeaSegment("productForm", idea.input, idea);
    expect(next).not.toBeNull();
    expect(
      itemMatchesFilters(
        next!.segments.productForm,
        "schoolEnvironment",
        undefined,
        "fastPrototype",
      ),
    ).toBe(true);
    expect(next?.segments.constraint).toEqual(idea.segments.constraint);
  });
});

it("refresh uses surprise bands with the same candidate pool", () => {
  const original = makeIdea({
    contextEnabled: false,
    constraintEnabled: false,
  });
  original.segments.productForm = productForms.find(
    (p) => p.id === "pf-protobot-voetbal",
  )!;
  original.segments.audience = audiences.find(
    (a) => a.id === "au-basisschool",
  )!;
  original.segments.problem = problems.find((p) => p.id === "pr-voedsel")!;
  const scores = ["logical", "balanced", "wild"].map((level) => {
    let seed = 123;
    vi.spyOn(Math, "random").mockImplementation(() => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    });
    const next = refreshIdeaSegment(
      "problem",
      {
        ...original.input,
        surpriseLevel: level as "logical" | "balanced" | "wild",
      },
      original,
    );
    expect(next).not.toBeNull();
    vi.restoreAllMocks();
    return scoreCombination(next!.segments);
  });
  expect(scores[0]).toBeGreaterThanOrEqual(scores[1]);
  expect(scores[1]).toBeGreaterThanOrEqual(scores[2]);
  expect(scores[0]).toBeGreaterThan(scores[2]);
});
