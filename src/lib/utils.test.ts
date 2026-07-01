import { afterEach, describe, expect, it, vi } from "vitest";
import { cn, createId, randomItem, uniqueBy } from "@/lib/utils";

describe("randomItem", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an item from the input array", () => {
    const items = ["a", "b", "c"];
    const result = randomItem(items);
    expect(items).toContain(result);
  });

  it("returns the only item for a single-item array", () => {
    expect(randomItem(["single"])).toBe("single");
  });

  it("only returns values from the original array across repeated calls", () => {
    const items = ["x", "y", "z"];
    const results = Array.from({ length: 50 }, () => randomItem(items));
    expect(results.every((value) => items.includes(value))).toBe(true);
  });

  it("throws on an empty array", () => {
    expect(() => randomItem([])).toThrow("randomItem called with empty array");
  });
});

describe("createId", () => {
  it("returns a non-empty string", () => {
    const id = createId();
    expect(id).toBeTypeOf("string");
    expect(id.length).toBeGreaterThan(0);
  });

  it("generally returns different values across calls", () => {
    const first = createId();
    const second = createId();
    expect(first).not.toBe(second);
  });

  it("returns a stable id-like format", () => {
    const id = createId();
    expect(id.trim()).toBe(id);
    expect(id).toMatch(/^[a-z0-9-]+$/i);
    expect(id.length).toBeGreaterThanOrEqual(8);
  });

  it("falls back without crashing when crypto.randomUUID is unavailable", () => {
    vi.stubGlobal("crypto", undefined);
    expect(() => createId()).not.toThrow();
    const fallbackId = createId();
    expect(fallbackId).toBeTypeOf("string");
    expect(fallbackId).not.toHaveLength(0);
    vi.unstubAllGlobals();
  });
});

describe("uniqueBy", () => {
  it("removes duplicates based on the generated key", () => {
    const items = [
      { id: "1", label: "A" },
      { id: "1", label: "A duplicate" },
      { id: "2", label: "B" },
    ];

    expect(uniqueBy(items, (item) => item.id)).toEqual([
      { id: "1", label: "A" },
      { id: "2", label: "B" },
    ]);
  });

  it("returns an empty array when the input is empty", () => {
    expect(uniqueBy([], (item: { id: string }) => item.id)).toEqual([]);
  });
});

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
