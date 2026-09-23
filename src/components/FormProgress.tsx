export function FormProgress({ step }: { step: number }) {
  const labels = ["Seus dados", "Seu trabalho", "Personalização"];
  return (
    <div aria-label="Progresso do formulário" className="space-y-3">
      <div className="h-2 overflow-hidden rounded-full bg-[var(--wally-soft)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--wally-blue)] to-[var(--wally-cyan)] transition-all"
          style={{ width: `${((step + 1) / labels.length) * 100}%` }}
        />
      </div>
      <ol className="grid grid-cols-3 gap-2 text-xs font-bold text-[var(--wally-muted)]">
        {labels.map((label, index) => (
          <li key={label} className={index === step ? "text-[var(--wally-blue-dark)]" : ""}>
            {label}
          </li>
        ))}
      </ol>
    </div>
  );
}
