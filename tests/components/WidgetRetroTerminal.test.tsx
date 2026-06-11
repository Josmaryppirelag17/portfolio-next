import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WidgetRetroTerminal from "@/components/molecules/WidgetRetroTerminal";

vi.mock("@/components/organisms/SoundEngine", () => ({
  soundEngine: { playClick: vi.fn(), playSuccess: vi.fn(), playError: vi.fn(), playHover: vi.fn() },
}));

vi.mock("@/components/atoms/WidgetShell", () => ({
  default: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="widget-shell" data-title={title}>{children}</div>
  ),
}));

describe("WidgetRetroTerminal", () => {
  const defaultProps = {
    onTriggerGlitch: vi.fn(),
    onTriggerOverload: vi.fn(),
    onCalmReactor: vi.fn(),
  };

  it("renders initial history", () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    expect(screen.getByText("SYSINIT_COMPLETE // CHIP ONLINE.")).toBeDefined();
  });

  it("renders command input and execute button", () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    expect(screen.getByLabelText("Terminal command")).toBeDefined();
    expect(screen.getByText("EXECUTE")).toBeDefined();
  });

  const submitCommand = async (cmd: string) => {
    const input = screen.getByLabelText("Terminal command");
    await userEvent.clear(input);
    await userEvent.type(input, cmd);
    await userEvent.click(screen.getByText("EXECUTE"));
  };

  it("shows help commands when typing 'help'", async () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    await submitCommand("help");
    expect(screen.getByText(/LIST OF PERMITTED CONSOLE PROMPT SCRIPTS/)).toBeDefined();
  });

  it("calls onTriggerGlitch when typing 'glitch'", async () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    await submitCommand("glitch");
    expect(defaultProps.onTriggerGlitch).toHaveBeenCalledOnce();
  });

  it("clears history when typing 'clear'", async () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    await submitCommand("clear");
    expect(screen.queryByText("SYSINIT_COMPLETE // CHIP ONLINE.")).toBeNull();
  });

  it("shows error for unknown command", async () => {
    render(<WidgetRetroTerminal {...defaultProps} />);
    await submitCommand("unknown_cmd");
    expect(screen.getByText(/CONSOLE_ERROR/)).toBeDefined();
  });
});
