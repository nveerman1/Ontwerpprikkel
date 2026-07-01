interface HeaderProps {
  onOpenSaved: () => void;
}

export default function Header({ onOpenSaved }: HeaderProps) {
  return (
    <header className="flex min-h-[84px] items-center justify-between gap-4 border-b border-white/10 bg-white/8 px-4 py-3 md:px-7">
      <div className="flex items-center gap-3 whitespace-nowrap text-2xl font-black tracking-tight">
        <span className="relative inline-block h-7 w-7 rounded-[8px_8px_18px_18px] bg-white before:absolute before:left-[-4px] before:top-[5px] before:h-2 before:w-5 before:rounded-full before:bg-[#d96345]" />
        OntwerpPrikkel
      </div>
      <button
        className="rounded-xl border border-white/10 bg-white/12 px-4 py-2.5 font-extrabold"
        onClick={onOpenSaved}
      >
        Opgeslagen ideeën
      </button>
    </header>
  );
}
