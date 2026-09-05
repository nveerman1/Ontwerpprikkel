import { CategoryItem, IdeaSegments, SurpriseLevel } from "@/types/generator";

// Unknown relationships are neutral; absent optional segments are excluded.
const overlap = (a: CategoryItem, b: CategoryItem) => {
  if (!a.semanticTags?.length || !b.semanticTags?.length) return 0.5;
  const shared = a.semanticTags.filter((tag) =>
    b.semanticTags!.includes(tag),
  ).length;
  return Math.min(
    1,
    shared / Math.min(2, a.semanticTags.length, b.semanticTags.length),
  );
};
export const scoreCombination = (s: IdeaSegments): number => {
  const pairs: [CategoryItem, CategoryItem, number][] = [
    [s.productForm, s.problem, 3],
    [s.audience, s.problem, 2],
    [s.productForm, s.audience, 1],
  ];
  if (s.market)
    pairs.push([s.problem, s.market, 2], [s.productForm, s.market, 1]);
  return (
    pairs.reduce((sum, [a, b, w]) => sum + overlap(a, b) * w, 0) /
    pairs.reduce((sum, [, , w]) => sum + w, 0)
  );
};

const BANDS: Record<SurpriseLevel, readonly [number, number]> = {
  logical: [0.8, 1],
  balanced: [0.45, 0.8],
  wild: [0, 0.45],
};
export const selectCandidate = <T extends { score: number }>(
  candidates: T[],
  level: SurpriseLevel,
  random = Math.random,
): T | null => {
  if (!candidates.length) return null;
  // Prefer at least one semantic connection whenever candidates provide one.
  const connected = candidates.filter((c) => c.score > 0);
  const sorted = [...(connected.length ? connected : candidates)].sort(
    (a, b) => a.score - b.score,
  );
  const [low, high] = BANDS[level];
  const band = sorted.slice(
    Math.floor(low * sorted.length),
    Math.max(
      Math.floor(low * sorted.length) + 1,
      Math.ceil(high * sorted.length),
    ),
  );
  return band[Math.min(band.length - 1, Math.floor(random() * band.length))];
};
