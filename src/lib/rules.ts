import { Direction, CategoryItem, ConstraintMode, IdeaSegments } from "@/types/generator";

const hasTag = (item: CategoryItem, tag: string) => item.tags?.includes(tag) ?? false;

export const itemMatchesFilters = (
  item: CategoryItem,
  direction?: Direction,
  type?: string,
  constraintMode?: ConstraintMode,
) => {
  const directionMatch = !direction || item.directions.includes(direction);
  const typeMatch = !type || !item.typeCompatibility || item.typeCompatibility.includes(type as never);
  const constraintMatch =
    !constraintMode ||
    constraintMode === "random" ||
    !item.constraintModes ||
    item.constraintModes.includes(constraintMode);

  return directionMatch && typeMatch && constraintMatch;
};

export const isCompatibleCombination = (
  segments: Partial<IdeaSegments>,
  constraintMode?: ConstraintMode,
) => {
  const productForm = segments.productForm;

  if (!productForm) return true;

  if (
    constraintMode === "withoutPower" &&
    (productForm.text.includes("sensor") || productForm.text.includes("app"))
  ) {
    return false;
  }

  if (
    constraintMode === "withoutApp" &&
    productForm.text.includes("app")
  ) {
    return false;
  }

  if (
    constraintMode === "waterResistant" &&
    segments.market &&
    ![
      "een buurt met wateroverlast",
      "een station",
      "een schoolplein",
      "een kleine badkamer",
      "een sportclub",
    ].includes(segments.market.text)
  ) {
    return false;
  }

  if (constraintMode === "scaleModelSafe" && hasTag(productForm, "nonSpatial")) {
    return false;
  }

  return true;
};
