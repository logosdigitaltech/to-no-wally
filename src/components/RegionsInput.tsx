"use client";

import { Plus, X } from "lucide-react";

export function RegionsInput({
  regions,
  onChange,
  error,
}: {
  regions: string[];
  onChange: (regions: string[]) => void;
  error?: string;
}) {
  const list = regions.length ? regions : [""];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-bold text-[var(--wally-blue-dark)]">
          Regiões atendidas <span className="font-normal text-[var(--wally-muted)]">(máximo 4)</span>
        </label>
        <span className="text-xs font-bold text-[var(--wally-muted)]">{list.length}/4</span>
      </div>
      <div className="space-y-2">
        {list.map((region, index) => (
          <div key={index} className="flex gap-2">
            <input
              className="field"
              value={region}
              maxLength={40}
              placeholder="Ex.: São João Del Rei"
              aria-label={`Região atendida ${index + 1}`}
              onChange={(event) => {
                const next = [...list];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[var(--wally-border)] bg-white text-[var(--wally-blue-dark)]"
              aria-label="Remover região"
              onClick={() => onChange(list.filter((_, regionIndex) => regionIndex !== index))}
              disabled={list.length === 1}
            >
              <X size={18} aria-hidden />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn-secondary w-full"
        disabled={list.length >= 4}
        onClick={() => onChange([...list, ""])}
      >
        <Plus size={18} aria-hidden /> Adicionar região
      </button>
      {error && <p className="text-sm font-semibold text-[var(--wally-danger)]">{error}</p>}
    </div>
  );
}
