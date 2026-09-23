import { describe, expect, it } from "vitest";
import { normalizeFileName } from "../files";

describe("normalizeFileName", () => {
  it("remove acentos e caracteres inválidos", () => {
    expect(normalizeFileName("Maria da Conceição & Filhos", "stories")).toBe(
      "cartao-wally-maria-da-conceicao-filhos-stories.png",
    );
  });

  it("usa fallback quando o nome está vazio", () => {
    expect(normalizeFileName("   ", "feed")).toBe("cartao-wally-profissional-feed.png");
  });
});
