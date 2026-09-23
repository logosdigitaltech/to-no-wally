import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ServicesInput } from "../ServicesInput";

describe("ServicesInput", () => {
  it("bloqueia adição ao chegar em quatro serviços", () => {
    render(<ServicesInput services={["1", "2", "3", "4"]} onChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: /adicionar serviço/i })).toBeDisabled();
  });

  it("notifica alteração de item", async () => {
    const onChange = vi.fn();
    render(<ServicesInput services={["Instalações"]} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Serviço 1"), " elétricas");
    expect(onChange).toHaveBeenCalled();
  });
});
