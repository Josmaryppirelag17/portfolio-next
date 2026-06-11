import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMobileMenu } from "@/hooks/useMobileMenu";

describe("useMobileMenu", () => {
  it("starts closed", () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.isMobileMenuOpen).toBe(false);
    expect(result.current.isMobileMenuExiting).toBe(false);
  });

  it("opens menu", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.setIsMobileMenuOpen(true));
    expect(result.current.isMobileMenuOpen).toBe(true);
  });

  it("closes menu with closeMobileMenu", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.setIsMobileMenuOpen(true));
    act(() => result.current.closeMobileMenu());
    expect(result.current.isMobileMenuExiting).toBe(true);
  });

  it("handles drawer animation end after closing", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.setIsMobileMenuOpen(true));
    act(() => result.current.closeMobileMenu());
    expect(result.current.isMobileMenuExiting).toBe(true);
    act(() => result.current.handleDrawerAnimationEnd());
    expect(result.current.isMobileMenuOpen).toBe(false);
    expect(result.current.isMobileMenuExiting).toBe(false);
  });

  it("does not close on animation end if not exiting", () => {
    const { result } = renderHook(() => useMobileMenu());
    act(() => result.current.setIsMobileMenuOpen(true));
    act(() => result.current.handleDrawerAnimationEnd());
    expect(result.current.isMobileMenuOpen).toBe(true);
  });

  it("adds keydown listener when opened with ref", () => {
    const { result } = renderHook(() => useMobileMenu());
    const el = document.createElement("div");
    (result.current.menuRef as any).current = el;
    const addSpy = vi.spyOn(el, "addEventListener");
    act(() => result.current.setIsMobileMenuOpen(true));
    expect(addSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
