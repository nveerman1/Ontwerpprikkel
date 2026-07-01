import { describe, it, expect, vi, afterEach } from "vitest";
import { copyText } from "@/lib/copy";

describe("copyText", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uses clipboard API and returns true on success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const result = await copyText("hello");
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(result).toBe(true);
  });

  it("returns false when clipboard is not available", async () => {
    Object.assign(navigator, { clipboard: undefined });

    const result = await copyText("hello");
    expect(result).toBe(false);
  });

  it("returns false when clipboard.writeText throws", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.assign(navigator, { clipboard: { writeText } });

    const result = await copyText("hello");
    expect(result).toBe(false);
  });
});
