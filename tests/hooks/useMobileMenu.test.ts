import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMobileMenu } from "@/hooks/useMobileMenu";

describe("useMobileMenu", () => {
  it("returns closed state by default", () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.isMobileMenuOpen).toBe(false);
    expect(result.current.isMobileMenuExiting).toBe(false);
  });

  it("opens menu via setIsMobileMenuOpen", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => {
      result.current.setIsMobileMenuOpen(true);
    });
    expect(result.current.isMobileMenuOpen).toBe(true);
  });

  it("starts exit animation on closeMobileMenu", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => {
      result.current.setIsMobileMenuOpen(true);
    });
    act(() => {
      result.current.closeMobileMenu();
    });
    expect(result.current.isMobileMenuExiting).toBe(true);
  });

  it("has menuRef defined", () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.menuRef.current).toBeNull();
  });
});
