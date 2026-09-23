import { describe, expect, it } from "vitest";
import { cardSchema, defaultValues } from "../schema";

const valid = {
  ...defaultValues,
  name: "Maria Silva",
  profession: "Eletricista residencial",
  city: "Campinas",
  bio: "Eletricista residencial com experiência em instalações, manutenção e reparos elétricos.",
  services: ["Instalações elétricas", "Troca de tomadas"],
  region: "Campinas e região",
};

describe("cardSchema", () => {
  it("aceita dados válidos", () => {
    expect(cardSchema.safeParse(valid).success).toBe(true);
  });

  it("limita a lista a quatro serviços", () => {
    const result = cardSchema.safeParse({
      ...valid,
      services: ["Serviço 1", "Serviço 2", "Serviço 3", "Serviço 4", "Serviço 5"],
    });
    expect(result.success).toBe(false);
  });

  it("aceita até quatro serviços e limita a região", () => {
    expect(
      cardSchema.safeParse({
        ...valid,
        services: ["Serviço 1", "Serviço 2", "Serviço 3", "Serviço 4"],
      }).success,
    ).toBe(true);
    expect(cardSchema.safeParse({ ...valid, region: "R".repeat(61) }).success).toBe(false);
  });

  it("valida contagem de caracteres da bio", () => {
    const result = cardSchema.safeParse({ ...valid, bio: "curta" });
    expect(result.success).toBe(false);
  });
});
