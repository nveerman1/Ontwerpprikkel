import { Idea, IdeaSegmentKey } from "@/types/generator";
import { contextPhrase } from "@/lib/formatIdea";
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
  const segment = (key: IdeaSegmentKey) => {
    const item = idea.segments[key];
    return item ? (
      <ChallengeSegment
        text={key === "market" ? contextPhrase(item) : item.text}
        locked={!!lockedSegments[key]}
        onToggleLock={() => onToggleLock(key)}
        onRefresh={() => onRefreshSegment(key)}
      />
    ) : null;
  };
  return (
    <>
      <h1 className="m-0 text-left text-[clamp(40px,5.35vw,84px)] font-black leading-[1.04] tracking-[-0.038em] [overflow-wrap:anywhere]">
        <span className="text-[#25282d]">Ontwerp een</span>{" "}
        {segment("productForm")} <span className="text-[#25282d]">voor</span>{" "}
        {segment("audience")} <span className="text-[#25282d]">om</span>{" "}
        {segment("problem")}{" "}
        <span className="text-[#25282d]">aan te pakken</span>
        {idea.segments.market && <> {segment("market")}</>}
        <span className="text-[#25282d]">.</span>
      </h1>
      {idea.segments.constraint && (
        <p
          data-testid="constraint"
          className="mt-6 text-xl font-bold leading-relaxed md:text-2xl"
        >
          <span className="text-[#25282d]">Randvoorwaarde:</span>{" "}
          {segment("constraint")}.
        </p>
      )}
      {idea.improvements?.map((text, index) => (
        <p key={index} className="mt-4 text-xl font-bold">
          {text}
        </p>
      ))}
    </>
  );
}
