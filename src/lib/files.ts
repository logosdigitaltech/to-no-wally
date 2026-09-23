export function normalizeFileName(value: string, suffix: "stories" | "feed") {
  const base =
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 64) || "profissional";

  return `cartao-wally-${base}-${suffix}.png`;
}

export function dataUrlToFile(dataUrl: string, fileName: string) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*);base64/)?.[1] ?? "image/png";
  const binary = atob(base64);
  const array = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new File([array], fileName, { type: mime });
}

export function isValidPhoto(file: File, maxBytes: number) {
  const accepted = ["image/jpeg", "image/png", "image/webp"];
  return accepted.includes(file.type) && file.size <= maxBytes;
}
