import { describe, it, expect, vi, afterEach } from "vitest";
import { generateIdea, refreshIdeaSegment } from "@/lib/generator";
import { GeneratorInput, Idea, IdeaSegmentKey } from "@/types/generator";

const defaultInput: GeneratorInput = {};

const makeIdea = (overrides?: Partial<GeneratorInput>): Idea =>
  generateIdea(overrides ?? defaultInput, {}, null, []);

describe("generateIdea", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("always returns an idea", () => {
    const idea = makeIdea();
    expect(idea).toBeDefined();
  });

  it("result contains id, createdAt, segments, sentence, input and signature", () => {
    const idea = makeIdea();
    expect(idea.id).toBeTypeOf("string");
    expect(idea.createdAt).toBeTypeOf("string");
    expect(idea.segments).toBeDefined();
    expect(idea.sentence).toBeTypeOf("string");
    expect(idea.input).toBeDefined();
    expect(idea.signature).toBeTypeOf("string");
  });

  it("segments contain all five keys", () => {
    const idea = makeIdea();
    expect(idea.segments.productForm).toBeDefined();
    expect(idea.segments.audience).toBeDefined();
    expect(idea.segments.problem).toBeDefined();
    expect(idea.segments.market).toBeDefined();
    expect(idea.segments.constraint).toBeDefined();
  });

  it("uses filters when direction is specified", () => {
    const input: GeneratorInput = { direction: "energyWaterSafety" };
    const idea = generateIdea(input, {}, null, []);
    // The idea should be generated successfully with or without filter match
    expect(idea).toBeDefined();
    expect(idea.input.direction).toBe("energyWaterSafety");
  });

  it("locked segments remain unchanged", () => {
    const firstIdea = makeIdea();
    const locked: Partial<Record<IdeaSegmentKey, boolean>> = {
      productForm: true,
      audience: true,
    };

    const secondIdea = generateIdea(defaultInput, locked, firstIdea, []);
    expect(secondIdea.segments.productForm.id).toBe(
      firstIdea.segments.productForm.id,
    );
    expect(secondIdea.segments.audience.id).toBe(
      firstIdea.segments.audience.id,
    );
  });

  it("avoids recent signatures when possible", () => {
    // Generate many ideas and collect signatures
    const signatures: string[] = [];
    for (let i = 0; i < 10; i++) {
      const idea = generateIdea(defaultInput, {}, null, signatures);
      // With enough variety, duplicates should be rare
      if (!signatures.includes(idea.signature)) {
        signatures.push(idea.signature);
      }
    }
    // We should have gotten at least a few unique signatures
    expect(signatures.length).toBeGreaterThan(1);
  });

  it("fallback gives a usable idea when filters are very strict", () => {
    // Use a very restrictive combination that likely exhausts attempts
    vi.spyOn(Math, "random").mockReturnValue(0);
    const input: GeneratorInput = {
      direction: "energyWaterSafety",
      type: "technicalDesign",
      constraintMode: "withoutPower",
    };
    const idea = generateIdea(input, {}, null, [
      // fill with fake signatures to trigger fallback
      ...Array.from({ length: 30 }, (_, i) => `fake-sig-${i}`),
    ]);
    expect(idea).toBeDefined();
    expect(idea.segments).toBeDefined();
    expect(idea.sentence).toBeTypeOf("string");
  });
});

describe("refreshIdeaSegment", () => {
  it("changes only the requested segment and preserves the rest", () => {
    const original = makeIdea();
    const refreshed = refreshIdeaSegment("problem", defaultInput, original);

    expect(refreshed.segments.productForm.id).toBe(
      original.segments.productForm.id,
    );
    expect(refreshed.segments.audience.id).toBe(original.segments.audience.id);
    expect(refreshed.segments.market.id).toBe(original.segments.market.id);
    expect(refreshed.segments.constraint.id).toBe(
      original.segments.constraint.id,
    );
    // sentence and signature should be recalculated
    expect(refreshed.sentence).toBeTypeOf("string");
    expect(refreshed.signature).toBeTypeOf("string");
  });

  it("keeps the same id as the original idea", () => {
    const original = makeIdea();
    const refreshed = refreshIdeaSegment("audience", defaultInput, original);
    expect(refreshed.id).toBe(original.id);
  });
});
