export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="wally-wordmark" aria-label="Wally">
      <span className={compact ? "text-2xl" : "text-[2rem]"}>wally</span>
    </span>
  );
}
