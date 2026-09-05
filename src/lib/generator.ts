import {
  audiences,
  constraints,
  markets,
  problems,
  productForms,
} from "@/data/generatorData";
import {
  CategoryItem,
  GeneratorInput,
  Idea,
  IdeaSegmentKey,
  IdeaSegments,
} from "@/types/generator";
import { formatIdeaSentence, ideaSignature } from "@/lib/formatIdea";
import { isCompatibleCombination, itemMatchesFilters } from "@/lib/rules";
import { scoreCombination, selectCandidate } from "@/lib/coherence";
import { createId, randomItem } from "@/lib/utils";

const segmentMap = {
  productForm: productForms,
  audience: audiences,
  problem: problems,
  market: markets,
  constraint: constraints,
};
const CANDIDATE_COUNT = 40;
const MAX_ATTEMPTS = 400;
type Locks = Partial<Record<IdeaSegmentKey, boolean>>;

export const generateIdea = (
  input: GeneratorInput,
  locks: Locks,
  current: Idea | null,
  recent: string[],
  refreshKey?: IdeaSegmentKey,
): Idea | null => {
  const enabled = (key: IdeaSegmentKey) =>
    (key !== "market" || input.contextEnabled !== false) &&
    (key !== "constraint" || input.constraintEnabled !== false);
  const pools = Object.fromEntries(
    Object.entries(segmentMap).map(([key, items]) => {
      const k = key as IdeaSegmentKey;
      const locked = locks[k] ? current?.segments[k] : undefined;
      const pool = enabled(k)
        ? (locked ? [locked] : items).filter(
            (item) =>
              itemMatchesFilters(
                item,
                input.direction,
                input.type,
                input.constraintEnabled === false
                  ? undefined
                  : input.constraintMode,
              ) &&
              (k !== "constraint" ||
                !input.constraintMode ||
                input.constraintMode === "random" ||
                item.constraintModes?.includes(input.constraintMode)) &&
              (k !== refreshKey || item.id !== current?.segments[k]?.id),
          )
        : [];
      return [k, pool];
    }),
  ) as Record<IdeaSegmentKey, CategoryItem[]>;
  if (
    (Object.keys(pools) as IdeaSegmentKey[]).some(
      (k) => enabled(k) && !pools[k].length,
    )
  )
    return null;
  const candidates: {
    segments: IdeaSegments;
    score: number;
    signature: string;
  }[] = [];
  const seen = new Set<string>();
  for (
    let attempt = 0;
    attempt < MAX_ATTEMPTS && candidates.length < CANDIDATE_COUNT;
    attempt++
  ) {
    const productForm = randomItem(pools.productForm);
    const segments: IdeaSegments = {
      productForm,
      audience: randomItem(pools.audience),
      problem: randomItem(pools.problem),
    };
    if (enabled("market")) segments.market = randomItem(pools.market);
    if (enabled("constraint")) {
      const compatible = pools.constraint.filter((constraint) => {
        if (
          productForm.constraintModes?.length &&
          !constraint.constraintModes?.some((mode) =>
            productForm.constraintModes!.includes(mode),
          )
        )
          return false;
        return constraint.constraintModes?.every((mode) =>
          isCompatibleCombination({ ...segments, constraint }, mode),
        );
      });
      if (!compatible.length) continue;
      segments.constraint = randomItem(compatible);
    }
    const signature = ideaSignature(segments);
    if (seen.has(signature)) continue;
    seen.add(signature);
    candidates.push({ segments, signature, score: scoreCombination(segments) });
  }
  const fresh = candidates.filter((c) => !recent.includes(c.signature));
  const chosen = selectCandidate(
    fresh.length ? fresh : candidates,
    input.surpriseLevel ?? "balanced",
  );
  if (!chosen) return null;
  return {
    id: createId(),
    createdAt: new Date().toISOString(),
    segments: chosen.segments,
    sentence: formatIdeaSentence(chosen.segments),
    input,
    signature: chosen.signature,
  };
};

export const refreshIdeaSegment = (
  key: IdeaSegmentKey,
  input: GeneratorInput,
  idea: Idea,
  locks: Locks = {},
): Idea | null => {
  if (
    locks[key] ||
    (key === "market" && input.contextEnabled === false) ||
    (key === "constraint" && input.constraintEnabled === false)
  )
    return idea;
  const fixed = Object.fromEntries(
    Object.keys(segmentMap).map((k) => [k, k !== key]),
  ) as Locks;
  const next = generateIdea(input, fixed, idea, [], key);
  return next
    ? {
        ...next,
        id: idea.id,
        createdAt: idea.createdAt,
        selectedWorkformId: idea.selectedWorkformId,
      }
    : null;
};
