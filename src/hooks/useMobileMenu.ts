"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuExiting, setIsMobileMenuExiting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuExiting(true);
  }, []);

  const handleDrawerAnimationEnd = useCallback(() => {
    if (isMobileMenuExiting) {
      setIsMobileMenuOpen(false);
      setIsMobileMenuExiting(false);
    }
  }, [isMobileMenuExiting]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0]!.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuExiting(true);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    menu.addEventListener("keydown", onKeyDown);
    return () => menu.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return {
    isMobileMenuOpen,
    isMobileMenuExiting,
    menuRef,
    closeMobileMenu,
    handleDrawerAnimationEnd,
    setIsMobileMenuOpen,
    setIsMobileMenuExiting,
  };
}
