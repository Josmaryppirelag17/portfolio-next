import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "@/app/loading";

describe("Loading page", () => {
  it("renders loading indicator", () => {
    render(<Loading />);
    expect(screen.getByLabelText("Cargando contenido")).toBeDefined();
    expect(screen.getByText("LOADING SYSTEM...")).toBeDefined();
  });
});
