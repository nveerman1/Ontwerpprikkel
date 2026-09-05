"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import ChallengeArea from "@/components/ChallengeArea";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import SavedIdeasDrawer from "@/components/SavedIdeasDrawer";
import Toast from "@/components/Toast";
import { constraintOptions } from "@/data/constraints";
import { directionGroupLabel, directionOptions } from "@/data/directions";
import { defaultWorkformId, workforms } from "@/data/workforms";
import { generateIdea, refreshIdeaSegment } from "@/lib/generator";
import { improveIdea } from "@/lib/improveIdea";
import { defaultInput, GENERATION_FAILURE } from "@/lib/defaults";
import {
  formatIdeaText,
  formatIdeaSentence,
  ideaSignature,
} from "@/lib/formatIdea";
import { copyText } from "@/lib/copy";
import { loadSavedIdeas, persistSavedIdeas } from "@/lib/storage";
import {
  AssignmentType,
  ConstraintMode,
  Direction,
  GeneratorInput,
  Idea,
  IdeaSegmentKey,
  SavedIdea,
} from "@/types/generator";
import { improvementOptions } from "@/data/improvementRules";

const typeOptions = [
  { value: "product", label: "Product" },
  { value: "system", label: "Systeem" },
  { value: "space", label: "Ruimte" },
  { value: "technicalDesign", label: "Technisch ontwerp" },
  { value: "researchIdea", label: "Onderzoeksidee" },
] as const;

const TOAST_DURATION_MS = 2200;
const MAX_SAVED_IDEAS = 30;

const buildCopyText = (idea: Idea, selectedWorkformId?: string) => {
  const selectedWorkform = selectedWorkformId
    ? workforms.find((item) => item.id === selectedWorkformId)
    : null;

  if (!selectedWorkform) return formatIdeaText(idea);

  return `${formatIdeaText(idea)}\n\nWerkvorm: ${selectedWorkform.title}\nDoel: ${selectedWorkform.goal}`;
};

export default function Home() {
  const [input, setInput] = useState<GeneratorInput>(defaultInput);
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [lockedSegments, setLockedSegments] = useState<
    Partial<Record<IdeaSegmentKey, boolean>>
  >({});
  const [recentSignatures, setRecentSignatures] = useState<string[]>([]);
  const [selectedWorkformId, setSelectedWorkformId] =
    useState(defaultWorkformId);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [generationError, setGenerationError] = useState(false);
  const [fallbackCopyText, setFallbackCopyText] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Client-only initialisation: generateIdea uses Math.random() and
  // loadSavedIdeas reads localStorage, both of which differ between
  // server and client. Deferring to useEffect avoids the hydration
  // mismatch. React 18+ batches these setState calls automatically.
  useEffect(() => {
    const initialIdea = generateIdea(defaultInput, {}, null, []);
    setCurrentIdea(initialIdea); // eslint-disable-line react-hooks/set-state-in-effect -- one-time client init for SSR-unsafe values
    setRecentSignatures(initialIdea ? [initialIdea.signature] : []);
    setSavedIdeas(loadSavedIdeas());
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const directionDropdownOptions = useMemo(
    () => [
      { value: "", label: "Alle richtingen" },
      ...directionOptions.map((item) => ({
        value: item.value,
        label: item.label,
        description: item.description,
        group: directionGroupLabel[item.group],
      })),
    ],
    [],
  );

  const constraintDropdownOptions = useMemo(
    () =>
      constraintOptions.map((item) => ({
        value: item.value,
        label: item.label,
      })),
    [],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    toastTimeoutRef.current = setTimeout(
      () => setToastMessage(""),
      TOAST_DURATION_MS,
    );
  };

  const regenerate = (
    customInput = input,
    customLocks = lockedSegments,
    baseIdea = currentIdea,
    recent = recentSignatures,
  ) => {
    const nextIdea = generateIdea(customInput, customLocks, baseIdea, recent);
    setGenerationError(!nextIdea);
    if (!nextIdea) {
      setFallbackCopyText("");
      return;
    }
    setCurrentIdea(nextIdea);
    setRecentSignatures((prev) => [nextIdea.signature, ...prev].slice(0, 10));
    setFallbackCopyText("");
  };

  const handleOptionalChange = (
    key: "contextEnabled" | "constraintEnabled",
    enabled: boolean,
  ) => {
    const nextInput = { ...input, [key]: enabled };
    const segmentKey = key === "contextEnabled" ? "market" : "constraint";
    const nextLocks = { ...lockedSegments, [segmentKey]: false };
    setInput(nextInput);
    setLockedSegments(nextLocks);
    setFallbackCopyText("");
    if (!enabled && currentIdea) {
      setGenerationError(false);
      const segments = { ...currentIdea.segments };
      delete segments[segmentKey];
      setCurrentIdea({
        ...currentIdea,
        input: nextInput,
        segments,
        sentence: formatIdeaSentence(segments),
        signature: ideaSignature(segments),
        improvements: undefined,
      });
    } else regenerate(nextInput, nextLocks);
  };

  const handleNewChallenge = () => {
    regenerate();
  };

  const handleRefreshSegment = (key: IdeaSegmentKey) => {
    if (!currentIdea) return;
    const next = refreshIdeaSegment(key, input, currentIdea, lockedSegments);
    if (!next) {
      showToast(GENERATION_FAILURE);
      return;
    }
    setGenerationError(false);
    setFallbackCopyText("");
    setCurrentIdea(next);
    setRecentSignatures((prev) => [next.signature, ...prev].slice(0, 10));
  };

  const handleToggleLock = (key: IdeaSegmentKey) => {
    setLockedSegments((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearLocks = () => {
    setLockedSegments({});
    showToast("Alle slotjes zijn gewist");
  };

  const handleResetFilters = () => {
    setInput(defaultInput);
    setLockedSegments({});
    regenerate(defaultInput, {}, null, recentSignatures);
    showToast("Filters zijn gereset");
  };

  const handleImprove = (action: (typeof improvementOptions)[number]) => {
    if (!currentIdea) return;
    const next = improveIdea(currentIdea, action);
    setCurrentIdea(next);
    showToast(`Verbeterd: ${action}`);
  };

  const handleCopy = async (idea: Idea) => {
    const text = buildCopyText(
      idea,
      idea === currentIdea ? selectedWorkformId : idea.selectedWorkformId,
    );
    const copied = await copyText(text);

    if (copied) {
      showToast("Gekopieerd naar klembord");
      setFallbackCopyText("");
      return;
    }

    setFallbackCopyText(text);
    showToast("Kopiëren faalde: kopieer handmatig uit het tekstvak");
  };

  const handleSave = () => {
    if (!currentIdea) return;

    const nextSavedIdeas: SavedIdea[] = [
      {
        ...currentIdea,
        selectedWorkformId,
        savedAt: new Date().toISOString(),
      },
      ...savedIdeas,
    ].slice(0, MAX_SAVED_IDEAS);

    const result = persistSavedIdeas(nextSavedIdeas);
    if (result === "unavailable") {
      showToast("Opslaan is niet beschikbaar in deze browser.");
      return;
    }
    if (result === "quota_exceeded") {
      showToast("Opslag is vol — verwijder oude ideeën.");
      return;
    }

    setSavedIdeas(nextSavedIdeas);
    showToast("Idee opgeslagen");
  };

  const handleUseSaved = (idea: SavedIdea) => {
    setCurrentIdea(idea);
    setGenerationError(false);
    setFallbackCopyText("");
    setInput({
      ...defaultInput,
      ...idea.input,
      contextEnabled: !!idea.segments.market,
      constraintEnabled: !!idea.segments.constraint,
    });
    setLockedSegments({});
    setSelectedWorkformId(idea.selectedWorkformId ?? defaultWorkformId);
    setSavedDrawerOpen(false);
  };

  const handleDeleteSaved = (id: string) => {
    const next = savedIdeas.filter((item) => item.id !== id);
    setSavedIdeas(next);
    persistSavedIdeas(next);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#d96345] text-white">
      <Header
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onCopy={() => currentIdea && handleCopy(currentIdea)}
        onSave={handleSave}
      />
      <FilterBar
        type={input.type ?? "product"}
        direction={input.direction ?? ""}
        constraintMode={input.constraintMode ?? "random"}
        contextEnabled={input.contextEnabled !== false}
        constraintEnabled={input.constraintEnabled !== false}
        surpriseLevel={input.surpriseLevel ?? "balanced"}
        onContextChange={(enabled) =>
          handleOptionalChange("contextEnabled", enabled)
        }
        onConstraintEnabledChange={(enabled) =>
          handleOptionalChange("constraintEnabled", enabled)
        }
        onSurpriseChange={(surpriseLevel) =>
          setInput((prev) => ({ ...prev, surpriseLevel }))
        }
        typeOptions={[...typeOptions]}
        directionOptions={directionDropdownOptions}
        constraintOptions={constraintDropdownOptions}
        onTypeChange={(value) =>
          setInput((prev) => ({ ...prev, type: value as AssignmentType }))
        }
        onDirectionChange={(value) =>
          setInput((prev) => ({
            ...prev,
            direction: (value || undefined) as Direction | undefined,
          }))
        }
        onConstraintChange={(value) =>
          setInput((prev) => ({
            ...prev,
            constraintMode: value as ConstraintMode,
          }))
        }
        onClearLocks={handleClearLocks}
        onResetFilters={handleResetFilters}
        onNewChallenge={handleNewChallenge}
        onImprove={handleImprove}
      />

      <main className="w-full px-4 pb-10 pt-6 md:px-6">
        {generationError && (
          <p role="alert" className="mb-6 rounded-xl bg-black/15 p-4 font-bold">
            {GENERATION_FAILURE}{" "}
            {currentIdea ? "De vorige uitdaging is behouden." : ""}
          </p>
        )}
        {currentIdea ? (
          <ChallengeArea
            idea={currentIdea}
            lockedSegments={lockedSegments}
            selectedWorkformId={selectedWorkformId}
            onToggleLock={handleToggleLock}
            onRefreshSegment={handleRefreshSegment}
            onSelectWorkform={setSelectedWorkformId}
          />
        ) : (
          <p className="text-lg font-bold">
            {generationError
              ? "Pas de filters aan en probeer opnieuw."
              : "Uitdaging wordt geladen…"}
          </p>
        )}

        {fallbackCopyText && (
          <div className="mt-4 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4">
            <p className="mb-2 text-sm font-extrabold">Handmatig kopiëren:</p>
            <textarea
              readOnly
              aria-label="Tekst om handmatig te kopiëren"
              className="h-32 w-full rounded-lg bg-white/90 p-2 text-sm text-black"
              value={fallbackCopyText}
            />
          </div>
        )}
      </main>

      <SavedIdeasDrawer
        open={savedDrawerOpen}
        savedIdeas={savedIdeas}
        workforms={workforms}
        onClose={() => setSavedDrawerOpen(false)}
        onUse={handleUseSaved}
        onCopy={handleCopy}
        onDelete={handleDeleteSaved}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
