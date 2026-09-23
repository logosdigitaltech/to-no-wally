"use client";

import { Copy, Download, MessageCircle, RotateCcw, Share2 } from "lucide-react";
import { buildWhatsAppMessage, buildWhatsAppUrl, shareCardFile } from "@/lib/share";
import { dataUrlToFile } from "@/lib/files";
import { trackEvent } from "@/lib/analytics";

type ShareActionsProps = {
  storyDataUrl?: string;
  feedDataUrl?: string;
  storyFileName: string;
  feedFileName: string;
  activeFormat: "story" | "feed";
  onReset: () => void;
  onNotice: (message: string, kind?: "info" | "success" | "error") => void;
};

export function ShareActions({
  storyDataUrl,
  feedDataUrl,
  storyFileName,
  feedFileName,
  activeFormat,
  onReset,
  onNotice,
}: ShareActionsProps) {
  const activeDataUrl = activeFormat === "story" ? storyDataUrl : feedDataUrl;
  const activeFileName = activeFormat === "story" ? storyFileName : feedFileName;

  function download(dataUrl: string | undefined, fileName: string, eventName: "download_story" | "download_feed") {
    if (!dataUrl) {
      onNotice("Gere a arte antes de baixar.", "error");
      return;
    }
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = fileName;
    anchor.click();
    trackEvent(eventName);
    onNotice("Download iniciado.", "success");
  }

  async function share() {
    if (!activeDataUrl) {
      onNotice("Gere a arte antes de compartilhar.", "error");
      return;
    }
    const file = dataUrlToFile(activeDataUrl, activeFileName);
    const shared = await shareCardFile(file, "Cartão Wally", buildWhatsAppMessage()).catch(() => false);
    if (shared) {
      trackEvent("share_card");
      onNotice("Compartilhamento aberto no aparelho.", "success");
      return;
    }
    download(activeDataUrl, activeFileName, activeFormat === "story" ? "download_story" : "download_feed");
    onNotice("Compartilhamento de arquivo não suportado neste navegador. Baixei a imagem para você anexar manualmente.");
  }

  async function copyCaption() {
    await navigator.clipboard.writeText(buildWhatsAppMessage());
    trackEvent("copy_caption");
    onNotice("Texto de divulgação copiado.", "success");
  }

  return (
    <div className="grid gap-3">
      <button className="btn-primary w-full" type="button" onClick={() => download(storyDataUrl, storyFileName, "download_story")}>
        <Download size={18} aria-hidden /> Baixar para Stories
      </button>
      <button className="btn-secondary w-full" type="button" onClick={() => download(feedDataUrl, feedFileName, "download_feed")}>
        <Download size={18} aria-hidden /> Baixar para o feed
      </button>
      <button className="btn-secondary w-full" type="button" onClick={() => void share()}>
        <Share2 size={18} aria-hidden /> Compartilhar
      </button>
      <a className="btn-secondary w-full" href={buildWhatsAppUrl()} onClick={() => trackEvent("share_whatsapp")}>
        <MessageCircle size={18} aria-hidden /> Compartilhar no WhatsApp
      </a>
      <button className="btn-secondary w-full" type="button" onClick={() => void copyCaption()}>
        <Copy size={18} aria-hidden /> Copiar texto de divulgação
      </button>
      <button className="btn-ghost w-full" type="button" onClick={onReset}>
        <RotateCcw size={18} aria-hidden /> Criar outro cartão
      </button>
    </div>
  );
}
