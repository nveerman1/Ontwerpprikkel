import { describe, it, expect } from "vitest";
import { itemMatchesFilters, isCompatibleCombination } from "@/lib/rules";
import { CategoryItem, IdeaSegments } from "@/types/generator";

const makeItem = (overrides?: Partial<CategoryItem>): CategoryItem => ({
  id: "test-item",
  text: "Test",
  directions: ["sustainability"],
  ...overrides,
});

describe("itemMatchesFilters", () => {
  it("matches when direction is in the item directions", () => {
    const item = makeItem({ directions: ["sustainability", "mobility"] });
    expect(itemMatchesFilters(item, "sustainability")).toBe(true);
  });

  it("does not match when direction is missing", () => {
    const item = makeItem({ directions: ["mobility"] });
    expect(itemMatchesFilters(item, "sustainability")).toBe(false);
  });

  it("matches any direction when no direction filter is specified", () => {
    const item = makeItem({ directions: ["mobility"] });
    expect(itemMatchesFilters(item, undefined)).toBe(true);
  });

  it("matches when type is in typeCompatibility", () => {
    const item = makeItem({ typeCompatibility: ["product", "system"] });
    expect(itemMatchesFilters(item, undefined, "product")).toBe(true);
  });

  it("does not match when type is not in typeCompatibility", () => {
    const item = makeItem({ typeCompatibility: ["product"] });
    expect(itemMatchesFilters(item, undefined, "system")).toBe(false);
  });

  it("matches any type when item has no typeCompatibility", () => {
    const item = makeItem({});
    expect(itemMatchesFilters(item, undefined, "system")).toBe(true);
  });

  it("matches when constraintMode is in item constraintModes", () => {
    const item = makeItem({ constraintModes: ["fastPrototype", "foldable"] });
    expect(
      itemMatchesFilters(item, undefined, undefined, "fastPrototype"),
    ).toBe(true);
  });

  it("does not match when constraintMode is not in item constraintModes", () => {
    const item = makeItem({ constraintModes: ["fastPrototype"] });
    expect(itemMatchesFilters(item, undefined, undefined, "foldable")).toBe(
      false,
    );
  });

  it("matches any constraintMode when item has no constraintModes", () => {
    const item = makeItem({});
    expect(itemMatchesFilters(item, undefined, undefined, "foldable")).toBe(
      true,
    );
  });

  it("treats random constraintMode as no filter", () => {
    const item = makeItem({ constraintModes: ["fastPrototype"] });
    expect(itemMatchesFilters(item, undefined, undefined, "random")).toBe(true);
  });
});

describe("isCompatibleCombination", () => {
  const baseSegments: IdeaSegments = {
    productForm: makeItem({ id: "pf-generic", text: "houder" }),
    audience: makeItem({ id: "au-1", text: "leerlingen" }),
    problem: makeItem({ id: "pr-1", text: "organisatie" }),
    market: makeItem({ id: "ma-station", text: "station" }),
    constraint: makeItem({ id: "co-1", text: "herbruikbaar" }),
  };

  it("rejects sensor/app with withoutPower", () => {
    const segments = {
      ...baseSegments,
      productForm: makeItem({ id: "pf-sensor", text: "sensor" }),
    };
    expect(isCompatibleCombination(segments, "withoutPower")).toBe(false);
  });

  it("rejects app with withoutApp", () => {
    const segments = {
      ...baseSegments,
      productForm: makeItem({ id: "pf-app", text: "app" }),
    };
    expect(isCompatibleCombination(segments, "withoutApp")).toBe(false);
  });

  it("allows valid combination", () => {
    expect(isCompatibleCombination(baseSegments, "fastPrototype")).toBe(true);
  });

  it("rejects waterResistant with non-water market", () => {
    const segments = {
      ...baseSegments,
      market: makeItem({ id: "ma-other", text: "park" }),
    };
    expect(isCompatibleCombination(segments, "waterResistant")).toBe(false);
  });

  it("allows waterResistant with water-related market", () => {
    const segments = {
      ...baseSegments,
      market: makeItem({ id: "ma-wateroverlast", text: "wateroverlast" }),
    };
    expect(isCompatibleCombination(segments, "waterResistant")).toBe(true);
  });

  it("rejects scaleModelSafe with nonSpatial product", () => {
    const segments = {
      ...baseSegments,
      productForm: makeItem({
        id: "pf-ns",
        text: "lesplan",
        tags: ["nonSpatial"],
      }),
    };
    expect(isCompatibleCombination(segments, "scaleModelSafe")).toBe(false);
  });

  it("allows scaleModelSafe with spatial product", () => {
    expect(isCompatibleCombination(baseSegments, "scaleModelSafe")).toBe(true);
  });
});
