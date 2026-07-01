import { SavedIdea, Workform } from "@/types/generator";

interface SavedIdeasDrawerProps {
  open: boolean;
  savedIdeas: SavedIdea[];
  workforms: Workform[];
  onClose: () => void;
  onUse: (idea: SavedIdea) => void;
  onCopy: (idea: SavedIdea) => void;
  onDelete: (id: string) => void;
}

export default function SavedIdeasDrawer({
  open,
  savedIdeas,
  workforms,
  onClose,
  onUse,
  onCopy,
  onDelete,
}: SavedIdeasDrawerProps) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-[min(440px,92vw)] overflow-auto bg-[#fff8f1] p-6 text-[#222] shadow-[-20px_0_70px_rgba(0,0,0,.25)] transition-transform ${
        open ? "translate-x-0" : "translate-x-[105%]"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">Opgeslagen ideeën</h2>
        <button
          className="h-9 w-9 rounded-full bg-[#222] text-lg text-white"
          onClick={onClose}
          aria-label="Sluit opgeslagen ideeën"
        >
          ×
        </button>
      </div>

      {savedIdeas.length === 0 ? (
        <p className="leading-relaxed text-[#666]">
          Je hebt nog geen ideeën opgeslagen. Klik op Bewaar om je huidige
          ontwerpuitdaging te bewaren.
        </p>
      ) : (
        <ul className="space-y-3">
          {savedIdeas.map((idea) => {
            const workform =
              workforms.find((item) => item.id === idea.selectedWorkformId) ?? null;

            return (
              <li key={idea.id} className="rounded-2xl border border-[#eed8ca] bg-white p-3.5">
                <strong className="mb-1 block">
                  Opgeslagen op{" "}
                  {new Date(idea.savedAt).toLocaleString("nl-NL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </strong>
                <p className="mb-2 text-sm leading-relaxed text-[#555]">{idea.sentence}</p>
                {workform && (
                  <p className="mb-2 text-xs font-bold text-[#9b5c48]">
                    Werkvorm: {workform.title}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg bg-[#ffe7d8] px-2.5 py-1.5 text-xs font-black" onClick={() => onUse(idea)}>
                    Gebruik opnieuw
                  </button>
                  <button className="rounded-lg bg-[#ffe7d8] px-2.5 py-1.5 text-xs font-black" onClick={() => onCopy(idea)}>
                    Kopieer
                  </button>
                  <button className="rounded-lg bg-[#ffe7d8] px-2.5 py-1.5 text-xs font-black" onClick={() => onDelete(idea.id)}>
                    Verwijder
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
