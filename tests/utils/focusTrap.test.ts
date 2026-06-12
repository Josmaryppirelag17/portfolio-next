import { describe, it, expect, vi } from "vitest";
import { trapTabFocus } from "@/utils/focusTrap";

describe("trapTabFocus", () => {
  function createMockRef(els: HTMLElement[]) {
    return {
      current: {
        querySelectorAll: () => els,
      },
    } as any;
  }

  it("does nothing on non-Tab key", () => {
    const ref = createMockRef([]);
    const e = new KeyboardEvent("keydown", { key: "Escape" });
    const preventDefault = vi.spyOn(e, "preventDefault");
    trapTabFocus(e, ref);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("does nothing when no focusable elements", () => {
    const ref = { current: { querySelectorAll: () => [] } } as any;
    const e = new KeyboardEvent("keydown", { key: "Tab" });
    const preventDefault = vi.spyOn(e, "preventDefault");
    trapTabFocus(e, ref);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("wraps focus from last to first on Tab", () => {
    const first = document.createElement("button");
    const last = document.createElement("input");
    vi.spyOn(document, "activeElement", "get").mockReturnValue(last);
    const ref = createMockRef([first, last]);
    const e = new KeyboardEvent("keydown", { key: "Tab" });
    const preventDefault = vi.spyOn(e, "preventDefault");
    const focusSpy = vi.spyOn(first, "focus");
    trapTabFocus(e, ref);
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it("wraps focus from first to last on Shift+Tab", () => {
    const first = document.createElement("button");
    const last = document.createElement("input");
    vi.spyOn(document, "activeElement", "get").mockReturnValue(first);
    const ref = createMockRef([first, last]);
    const e = new KeyboardEvent("keydown", { key: "Tab", shiftKey: true });
    const preventDefault = vi.spyOn(e, "preventDefault");
    const focusSpy = vi.spyOn(last, "focus");
    trapTabFocus(e, ref);
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(focusSpy).toHaveBeenCalledOnce();
  });
});
