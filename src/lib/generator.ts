import {
  audiences,
  constraints,
  markets,
  problems,
  productForms,
} from "@/data/generatorData";
import {
  ConstraintMode,
  GeneratorInput,
  Idea,
  IdeaSegmentKey,
  IdeaSegments,
} from "@/types/generator";
import { formatIdeaSentence, ideaSignature } from "@/lib/formatIdea";
import { isCompatibleCombination, itemMatchesFilters } from "@/lib/rules";
import { randomItem } from "@/lib/utils";

const segmentMap = {
  productForm: productForms,
  audience: audiences,
  problem: problems,
  market: markets,
  constraint: constraints,
};

const pickWithFallback = (
  key: IdeaSegmentKey,
  input: GeneratorInput,
  lockValue?: IdeaSegments[IdeaSegmentKey],
  relaxDirection = false,
  relaxConstraint = false,
) => {
  if (lockValue) return lockValue;

  const pool = segmentMap[key].filter((item) => {
    const direction = relaxDirection ? undefined : input.direction;
    const constraintMode = relaxConstraint ? undefined : input.constraintMode;
    return itemMatchesFilters(item, direction, input.type, constraintMode);
  });

  if (pool.length > 0) return randomItem(pool);
  if (!relaxDirection) return pickWithFallback(key, input, lockValue, true, relaxConstraint);
  if (!relaxConstraint) return pickWithFallback(key, input, lockValue, true, true);
  return randomItem(segmentMap[key]);
};

export const generateIdea = (
  input: GeneratorInput,
  lockedSegments: Partial<Record<IdeaSegmentKey, boolean>>,
  currentIdea: Idea | null,
  recentSignatures: string[],
): Idea => {
  let attempts = 0;

  while (attempts < 24) {
    const segments: IdeaSegments = {
      productForm: pickWithFallback(
        "productForm",
        input,
        lockedSegments.productForm ? currentIdea?.segments.productForm : undefined,
      ),
      audience: pickWithFallback(
        "audience",
        input,
        lockedSegments.audience ? currentIdea?.segments.audience : undefined,
      ),
      problem: pickWithFallback(
        "problem",
        input,
        lockedSegments.problem ? currentIdea?.segments.problem : undefined,
      ),
      market: pickWithFallback(
        "market",
        input,
        lockedSegments.market ? currentIdea?.segments.market : undefined,
      ),
      constraint: pickWithFallback(
        "constraint",
        input,
        lockedSegments.constraint ? currentIdea?.segments.constraint : undefined,
      ),
    };

    if (!isCompatibleCombination(segments, input.constraintMode)) {
      attempts += 1;
      continue;
    }

    const signature = ideaSignature(segments);
    if (recentSignatures.includes(signature) && attempts < 20) {
      attempts += 1;
      continue;
    }

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
      segments,
      sentence: formatIdeaSentence(segments),
      input,
      signature,
    };
  }

  const fallbackSegments: IdeaSegments = {
    productForm: randomItem(productForms),
    audience: randomItem(audiences),
    problem: randomItem(problems),
    market: randomItem(markets),
    constraint: randomItem(
      input.constraintMode && input.constraintMode !== "random"
        ? constraints.filter(
            (item) =>
              item.constraintModes?.includes(input.constraintMode as ConstraintMode),
          )
        : constraints,
    ),
  };

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
    segments: fallbackSegments,
    sentence: formatIdeaSentence(fallbackSegments),
    input,
    signature: ideaSignature(fallbackSegments),
  };
};

export const refreshIdeaSegment = (
  key: IdeaSegmentKey,
  input: GeneratorInput,
  idea: Idea,
): Idea => {
  const nextSegment = pickWithFallback(key, input);
  const segments = { ...idea.segments, [key]: nextSegment };

  return {
    ...idea,
    segments,
    sentence: formatIdeaSentence(segments),
    signature: ideaSignature(segments),
  };
};
