"use client";

import { useMemo, useRef, useState } from "react";
import ChallengeArea from "@/components/ChallengeArea";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/Header";
import SavedIdeasDrawer from "@/components/SavedIdeasDrawer";
import Toast from "@/components/Toast";
import { constraintOptions } from "@/data/constraints";
import {
  directionGroupLabel,
  directionOptions,
} from "@/data/directions";
import { defaultWorkformId, workforms } from "@/data/workforms";
import { generateIdea, refreshIdeaSegment } from "@/lib/generator";
import { improveIdea } from "@/lib/improveIdea";
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

const defaultInput: GeneratorInput = {
  type: "product",
  direction: "schoolEnvironment",
  constraintMode: "fastPrototype",
};

const TOAST_DURATION_MS = 2200;
const MAX_SAVED_IDEAS = 30;

const buildCopyText = (idea: Idea, selectedWorkformId?: string) => {
  const selectedWorkform = selectedWorkformId
    ? workforms.find((item) => item.id === selectedWorkformId)
    : null;

  if (!selectedWorkform) return idea.sentence;

  return `${idea.sentence}\n\nWerkvorm: ${selectedWorkform.title}\nDoel: ${selectedWorkform.goal}`;
};

export default function Home() {
  const initialIdea = generateIdea(defaultInput, {}, null, []);
  const [input, setInput] = useState<GeneratorInput>(defaultInput);
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(initialIdea);
  const [lockedSegments, setLockedSegments] =
    useState<Partial<Record<IdeaSegmentKey, boolean>>>({});
  const [recentSignatures, setRecentSignatures] = useState<string[]>([
    initialIdea.signature,
  ]);
  const [selectedWorkformId, setSelectedWorkformId] =
    useState(defaultWorkformId);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>(() =>
    loadSavedIdeas(),
  );
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [fallbackCopyText, setFallbackCopyText] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const directionDropdownOptions = useMemo(
    () =>
      directionOptions.map((item) => ({
        value: item.value,
        label: item.label,
        description: item.description,
        group: directionGroupLabel[item.group],
      })),
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
    setCurrentIdea(nextIdea);
    setRecentSignatures((prev) => [nextIdea.signature, ...prev].slice(0, 10));
    setFallbackCopyText("");
  };

  const handleNewChallenge = () => {
    regenerate();
  };

  const handleRefreshSegment = (key: IdeaSegmentKey) => {
    if (!currentIdea) return;
    const next = refreshIdeaSegment(key, input, currentIdea);
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
    const text = buildCopyText(idea, selectedWorkformId);
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

    const persisted = persistSavedIdeas(nextSavedIdeas);
    if (!persisted) {
      showToast("Opslaan is niet beschikbaar in deze browser.");
      return;
    }

    setSavedIdeas(nextSavedIdeas);
    showToast("Idee opgeslagen");
  };

  const handleUseSaved = (idea: SavedIdea) => {
    setCurrentIdea(idea);
    setSelectedWorkformId(idea.selectedWorkformId ?? defaultWorkformId);
    setSavedDrawerOpen(false);
  };

  const handleDeleteSaved = (id: string) => {
    const next = savedIdeas.filter((item) => item.id !== id);
    setSavedIdeas(next);
    persistSavedIdeas(next);
  };

  return (
    <div className="min-h-screen bg-[#d96345] text-white">
      <Header onOpenSaved={() => setSavedDrawerOpen(true)} />
      <FilterBar
        type={input.type ?? "product"}
        direction={input.direction ?? "schoolEnvironment"}
        constraintMode={input.constraintMode ?? "random"}
        typeOptions={[...typeOptions]}
        directionOptions={directionDropdownOptions}
        constraintOptions={constraintDropdownOptions}
        onTypeChange={(value) =>
          setInput((prev) => ({ ...prev, type: value as AssignmentType }))
        }
        onDirectionChange={(value) =>
          setInput((prev) => ({ ...prev, direction: value as Direction }))
        }
        onConstraintChange={(value) =>
          setInput((prev) => ({ ...prev, constraintMode: value as ConstraintMode }))
        }
        onClearLocks={handleClearLocks}
        onResetFilters={handleResetFilters}
        onNewChallenge={handleNewChallenge}
        onImprove={handleImprove}
        onCopy={() => currentIdea && handleCopy(currentIdea)}
        onSave={handleSave}
      />

      <main className="w-full px-4 pb-10 pt-6 md:px-6">
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
            Geen passende combinatie gevonden. Kies een andere richting of
            randvoorwaarde.
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
