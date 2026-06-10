"use client";

import { useState, useEffect, useRef } from "react";
import { soundEngine } from "@/components/organisms/SoundEngine";

export function useMatrixEasterEgg() {
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const typedSequenceRef = useRef("");
  const tapTimesRef = useRef<number[]>([]);

  const triggerMatrix = () => {
    typedSequenceRef.current = "";
    setIsMatrixActive(true);
    soundEngine.playSuccess();
    soundEngine.playSynthKey(523.25);
  };

  const closeMatrixOverlay = () => {
    typedSequenceRef.current = "";
    setIsMatrixActive(false);
  };

  const handleLogoTap = () => {
    const now = Date.now();
    tapTimesRef.current = tapTimesRef.current.filter(t => now - t < 3000);
    tapTimesRef.current.push(now);
    if (tapTimesRef.current.length >= 5) {
      tapTimesRef.current = [];
      triggerMatrix();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const rawKey = e.key;
      if (!rawKey || rawKey.length !== 1) return;
      const next = (typedSequenceRef.current + rawKey.toLowerCase()).slice(-20);
      typedSequenceRef.current = next;
      if (next.includes("matrix") || next.includes("hack")) {
        triggerMatrix();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  return { isMatrixActive, triggerMatrix, closeMatrixOverlay, handleLogoTap };
}
