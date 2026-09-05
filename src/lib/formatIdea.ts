import { CategoryItem, Idea, IdeaSegments } from "@/types/generator";
export const contextPhrase = (market: CategoryItem) =>
  market.contextPhrase ?? `in ${market.text}`;
export const formatConstraint = (segments: IdeaSegments) =>
  segments.constraint
    ? `Randvoorwaarde: ${segments.constraint.text.replace(/\.$/, "")}.`
    : "";
export const formatIdeaSentence = (s: IdeaSegments) =>
  `Ontwerp een ${s.productForm.text} voor ${s.audience.text} om ${s.problem.text} aan te pakken${s.market ? ` ${contextPhrase(s.market)}` : ""}.`;
export const formatIdeaText = (idea: Idea) =>
  [idea.sentence, formatConstraint(idea.segments)].filter(Boolean).join("\n\n");
export const ideaSignature = (s: IdeaSegments) =>
  [
    s.productForm.id,
    s.audience.id,
    s.problem.id,
    s.market?.id ?? "",
    s.constraint?.id ?? "",
  ].join("|");
