import { Idea, IdeaSegmentKey } from "@/types/generator";
import ChallengeSegment from "@/components/ChallengeSegment";

interface ChallengeSentenceProps {
  idea: Idea;
  lockedSegments: Partial<Record<IdeaSegmentKey, boolean>>;
  onToggleLock: (key: IdeaSegmentKey) => void;
  onRefreshSegment: (key: IdeaSegmentKey) => void;
}

export default function ChallengeSentence({
  idea,
  lockedSegments,
  onToggleLock,
  onRefreshSegment,
}: ChallengeSentenceProps) {
  return (
    <h1 className="m-0 text-left text-[clamp(40px,5.35vw,84px)] font-black leading-[1.04] tracking-[-0.038em] [overflow-wrap:anywhere]">
      <span className="text-[#25282d]">Ontwerp een</span>{" "}
      <ChallengeSegment
        text={idea.segments.productForm.text}
        locked={!!lockedSegments.productForm}
        onToggleLock={() => onToggleLock("productForm")}
        onRefresh={() => onRefreshSegment("productForm")}
      />{" "}
      <span className="text-[#25282d]">voor</span>{" "}
      <ChallengeSegment
        text={idea.segments.audience.text}
        locked={!!lockedSegments.audience}
        onToggleLock={() => onToggleLock("audience")}
        onRefresh={() => onRefreshSegment("audience")}
      />{" "}
      <span className="text-[#25282d]">dat helpt bij</span>{" "}
      <ChallengeSegment
        text={idea.segments.problem.text}
        locked={!!lockedSegments.problem}
        onToggleLock={() => onToggleLock("problem")}
        onRefresh={() => onRefreshSegment("problem")}
      />{" "}
      <span className="text-[#25282d]">in</span>{" "}
      <ChallengeSegment
        text={idea.segments.market.text}
        locked={!!lockedSegments.market}
        onToggleLock={() => onToggleLock("market")}
        onRefresh={() => onRefreshSegment("market")}
      />
      <span className="text-[#25282d]">, met als beperking dat het</span>{" "}
      <ChallengeSegment
        text={idea.segments.constraint.text}
        locked={!!lockedSegments.constraint}
        onToggleLock={() => onToggleLock("constraint")}
        onRefresh={() => onRefreshSegment("constraint")}
      />
      <span className="text-[#25282d]">.</span>
    </h1>
  );
}
