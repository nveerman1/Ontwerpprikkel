import { IdeaSegments } from "@/types/generator";

export const formatIdeaSentence = (segments: IdeaSegments) =>
  `Ontwerp een ${segments.productForm.text} voor ${segments.audience.text} dat helpt bij ${segments.problem.text} in ${segments.market.text}, met als beperking dat het ${segments.constraint.text}.`;

export const ideaSignature = (segments: IdeaSegments) =>
  [
    segments.productForm.id,
    segments.audience.id,
    segments.problem.id,
    segments.market.id,
    segments.constraint.id,
  ].join("|");
