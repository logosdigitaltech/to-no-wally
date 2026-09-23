import { WALLY_DOWNLOAD_URL } from "./config";

export const disclosureText =
  "Tô no Wally! Conheça meu trabalho e solicite seu orçamento pelo app. Escaneie o QR Code para baixar.";

export function buildWhatsAppMessage(downloadUrl = WALLY_DOWNLOAD_URL) {
  return `Tô no Wally! Conheça meu trabalho e solicite seu orçamento pelo app. Baixe aqui: ${downloadUrl}`;
}

export function buildWhatsAppUrl(message = buildWhatsAppMessage()) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function canShareFile(file: File) {
  if (typeof navigator === "undefined") return false;
  if (!("share" in navigator) || !("canShare" in navigator)) return false;
  return navigator.canShare({ files: [file] });
}

export async function shareCardFile(file: File, title: string, text: string) {
  if (!canShareFile(file)) return false;
  await navigator.share({ files: [file], title, text });
  return true;
}
