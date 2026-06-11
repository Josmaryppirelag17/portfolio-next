import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/components/organisms/LanguageContext";

const storage = new Map<string, string>();

vi.mock("@/i18n/es", () => ({
  translations: { hello: "Hola", goodbye: "Adiós" },
  projects: [],
  milestones: [],
}));

vi.mock("@/i18n/en", () => ({
  translations: { hello: "Hello", goodbye: "Goodbye" },
  projects: [],
  milestones: [],
}));

beforeAll(() => {
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => storage.get(k) ?? null,
    setItem: (k: string, v: string) => storage.set(k, v),
    removeItem: (k: string) => storage.delete(k),
    clear: () => storage.clear(),
    length: storage.size,
    key: (i: number) => [...storage.keys()][i] ?? null,
  });
});

function TestConsumer() {
  const { language, t, toggleLanguage, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <span data-testid="translated">{t("hello")}</span>
      <button data-testid="toggle" onClick={toggleLanguage}>Toggle</button>
      <button data-testid="set-en" onClick={() => setLanguage("en")}>Set EN</button>
      <button data-testid="set-es" onClick={() => setLanguage("es")}>Set ES</button>
    </div>
  );
}

describe("LanguageProvider", () => {
  it("provides default Spanish", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("lang").textContent).toBe("es");
    expect(screen.getByTestId("translated").textContent).toBe("Hola");
  });

  it("toggles language", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );
    act(() => screen.getByTestId("toggle").click());
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("translated").textContent).toBe("Hello");
  });

  it("sets language to English", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>,
    );
    act(() => screen.getByTestId("set-en").click());
    expect(screen.getByTestId("lang").textContent).toBe("en");
  });

  it("renders accessibility announcer", () => {
    const { container } = render(
      <LanguageProvider>
        <div>child</div>
      </LanguageProvider>,
    );
    const announcer = container.querySelector('[role="status"]');
    expect(announcer).toBeDefined();
    expect(announcer).toHaveAttribute("aria-live", "polite");
  });
});

describe("useLanguage", () => {
  it("throws outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow("useLanguage must be used within a LanguageProvider");
  });
});
