import { describe, expect, it, vi } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl, canShareFile } from "../share";

describe("share helpers", () => {
  it("gera texto do WhatsApp com link", () => {
    expect(buildWhatsAppMessage("https://example.com")).toContain("https://example.com");
  });

  it("gera URL codificada para WhatsApp", () => {
    expect(buildWhatsAppUrl("Olá Wally")).toBe("https://wa.me/?text=Ol%C3%A1%20Wally");
  });

  it("retorna falso sem suporte à Web Share API", () => {
    vi.stubGlobal("navigator", {});
    expect(canShareFile(new File(["x"], "card.png", { type: "image/png" }))).toBe(false);
    vi.unstubAllGlobals();
  });
});
