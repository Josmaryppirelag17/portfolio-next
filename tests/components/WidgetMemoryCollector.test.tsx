import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import WidgetMemoryCollector from "@/components/molecules/WidgetMemoryCollector";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playHover: vi.fn(), playError: vi.fn() },
}));

vi.mock("@/components/atoms/WidgetShell", () => ({
  default: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="widget-shell" data-title={title}>
      {children}
    </div>
  ),
}));

describe("WidgetMemoryCollector", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("renders initial percentage", () => {
    render(<WidgetMemoryCollector />);
    expect(screen.getByText("78%")).toBeDefined();
  });

  it("renders initial log lines", () => {
    render(<WidgetMemoryCollector />);
    expect(screen.getByText("// SYS STATS LOADED OK.")).toBeDefined();
    expect(screen.getByText("// STANDBY CACHE READY FOR SCRUB.")).toBeDefined();
  });

  it("renders purge button", () => {
    render(<WidgetMemoryCollector />);
    expect(screen.getByText("SCRUB COGNITIVE CACHE RAM")).toBeDefined();
  });

  it("updates logs and percentage when purge is clicked", () => {
    render(<WidgetMemoryCollector />);
    const btn = screen.getByText("SCRUB COGNITIVE CACHE RAM");
    fireEvent.click(btn);

    expect(screen.getByText("EXECUTING PURGE SYSTEM DATA")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(1300);
    });
    expect(screen.getByText("SCANNING CACHED CORRUPTION SECTORS...")).toBeDefined();
    expect(screen.getByText("KILLING IMPOSING residual_doubts.dll...")).toBeDefined();

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText("OPTIMIZATION COMPLETE: INTELLECT OVERCLOCK ACTIVE!")).toBeDefined();
    expect(screen.getByText("SCRUB COGNITIVE CACHE RAM")).toBeDefined();
  });
});
