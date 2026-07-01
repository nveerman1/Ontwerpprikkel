import { Idea, IdeaSegmentKey } from "@/types/generator";
import ChallengeSentence from "@/components/ChallengeSentence";
import WorkformRail from "@/components/WorkformRail";

interface ChallengeAreaProps {
  idea: Idea;
  lockedSegments: Partial<Record<IdeaSegmentKey, boolean>>;
  selectedWorkformId: string;
  onToggleLock: (key: IdeaSegmentKey) => void;
  onRefreshSegment: (key: IdeaSegmentKey) => void;
  onSelectWorkform: (id: string) => void;
}

export default function ChallengeArea({
  idea,
  lockedSegments,
  selectedWorkformId,
  onToggleLock,
  onRefreshSegment,
  onSelectWorkform,
}: ChallengeAreaProps) {
  return (
    <section className="hero-layout" aria-live="polite">
      <div className="min-w-0">
        <ChallengeSentence
          idea={idea}
          lockedSegments={lockedSegments}
          onToggleLock={onToggleLock}
          onRefreshSegment={onRefreshSegment}
        />
      </div>
      <WorkformRail
        selectedWorkformId={selectedWorkformId}
        onSelectWorkform={onSelectWorkform}
      />
    </section>
  );
}
