"use client";

import { ImagePlus, Trash2 } from "lucide-react";
import { MAX_PHOTO_BYTES, MAX_PHOTO_MB } from "@/lib/config";
import { isValidPhoto } from "@/lib/files";

type PhotoUploaderProps = {
  photoName?: string;
  error?: string;
  onChange: (payload: { dataUrl?: string; name?: string; size?: number; error?: string }) => void;
};

export function PhotoUploader({ photoName, error, onChange }: PhotoUploaderProps) {
  async function handleFile(file?: File) {
    if (!file) return;
    if (!isValidPhoto(file, MAX_PHOTO_BYTES)) {
      onChange({ error: `Envie uma imagem JPG, PNG ou WebP com até ${MAX_PHOTO_MB} MB.` });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ dataUrl: String(reader.result), name: file.name, size: file.size });
    };
    reader.onerror = () => onChange({ error: "Não foi possível carregar a foto. Tente outra imagem." });
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-[var(--wally-blue-dark)]" htmlFor="photo">
        Foto profissional
      </label>
      <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--wally-border)] bg-white p-5 text-center">
        <ImagePlus className="text-[var(--wally-blue)]" aria-hidden />
        <span className="font-bold">{photoName || "Escolher foto"}</span>
        <span className="text-sm text-[var(--wally-muted)]">
          Prefira uma foto bem iluminada, com seu rosto ou trabalho em destaque.
        </span>
        <input
          id="photo"
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </label>
      {photoName && (
        <button type="button" className="btn-secondary w-full" onClick={() => onChange({ dataUrl: undefined, name: undefined, size: undefined })}>
          <Trash2 size={18} aria-hidden /> Remover foto
        </button>
      )}
      {error && <p className="text-sm font-semibold text-[var(--wally-danger)]">{error}</p>}
    </div>
  );
}
