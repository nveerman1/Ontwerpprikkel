interface ChallengeSegmentProps {
  text: string;
  locked: boolean;
  onToggleLock: () => void;
  onRefresh: () => void;
}

export default function ChallengeSegment({
  text,
  locked,
  onToggleLock,
  onRefresh,
}: ChallengeSegmentProps) {
  return (
    <span className="group inline-flex items-baseline gap-[0.08em]">
      <span className="text-white underline-offset-8 [text-decoration-thickness:5px] group-hover:underline">
        {text}
      </span>
      <span className="ml-[0.03em] inline-flex -translate-y-[0.3em] gap-0.5">
        <button
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-xs ${
            locked ? "bg-white text-[#c9563a]" : "bg-white/14 text-white/80"
          }`}
          onClick={onToggleLock}
          title="Vastzetten"
          aria-label={locked ? "Segment ontgrendelen" : "Segment vergrendelen"}
          aria-pressed={locked}
        >
          {locked ? "🔒" : "🔓"}
        </button>
        <button
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/14 text-xs text-white/80"
          onClick={onRefresh}
          title="Alleen dit segment verversen"
          aria-label="Alleen dit segment verversen"
        >
          ↻
        </button>
      </span>
    </span>
  );
}
