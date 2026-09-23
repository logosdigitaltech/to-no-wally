import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { CardPreview } from "../CardPreview";
import { defaultValues } from "@/lib/schema";

const values = {
  ...defaultValues,
  name: "Maria Silva",
  profession: "Eletricista",
  city: "Campinas",
  bio: "Eletricista residencial com experiência em instalações, manutenção e reparos elétricos.",
  services: ["Instalações"],
  region: "Campinas",
};

describe("CardPreview", () => {
  it("renderiza conteúdo principal", () => {
    render(<CardPreview values={values} previewFormat="feed" />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Tô no Wally!")).toBeInTheDocument();
    expect(
      screen.getByText("Conheça meu trabalho e solicite seu orçamento pelo app."),
    ).toBeInTheDocument();
  });

  it("mantém dimensões de exportação do story", () => {
    render(<CardPreview values={values} previewFormat="story" exportMode />);
    const card = screen.getByTestId("card-story");
    expect(card).toHaveStyle({ width: "1080px", height: "1920px" });
  });
});
