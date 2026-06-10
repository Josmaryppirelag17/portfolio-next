"use client";

import { useState, useEffect } from "react";
import { soundEngine } from "@/components/organisms/SoundEngine";

export function useAudio() {
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const fn = () => setIsAudioActive(soundEngine.isEnabled());
    fn();
  }, []);

  const toggleMasterAudio = () => {
    const newState = soundEngine.toggle();
    setIsAudioActive(newState);
    soundEngine.playToggleSound();
  };

  return { isAudioActive, toggleMasterAudio };
}
