"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, ShieldAlert } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";

interface CoreBalancerProps {
  onCoreStateChange: (state: "stable" | "unstable" | "venting") => void;
}

export default function WidgetCoreBalancer({ onCoreStateChange }: CoreBalancerProps) {
  const [plutonium, setPlutonium] = useState(65);
  const [plasma, setPlasma] = useState(45);
  const [warpCore, setWarpCore] = useState(55);
  const [ventActive, setVentActive] = useState(false);

  const averageLoad = (plutonium + plasma + warpCore) / 3;
  const isOverload = averageLoad >= 85;

  useEffect(() => {
    if (ventActive) onCoreStateChange("venting");
    else if (isOverload) onCoreStateChange("unstable");
    else onCoreStateChange("stable");
  }, [isOverload, ventActive, onCoreStateChange]);

  const triggerEmergencyClean = () => {
    soundEngine.playSuccess();
    setVentActive(true);
    if (typeof window !== "undefined") {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const testCtx = new AudioCtx();
          const oscIndex = [180, 160, 140, 120, 100];
          oscIndex.forEach((freq, i) => {
            setTimeout(() => {
              const osc = testCtx.createOscillator();
              const gain = testCtx.createGain();
              osc.type = "sawtooth";
              osc.frequency.setValueAtTime(freq, testCtx.currentTime);
              gain.gain.setValueAtTime(0.06, testCtx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.0001, testCtx.currentTime + 0.5);
              osc.connect(gain);
              gain.connect(testCtx.destination);
              osc.start();
              osc.stop(testCtx.currentTime + 0.5);
            }, i * 150);
          });
          setTimeout(() => testCtx.close(), oscIndex.length * 150 + 600);
        }
      } catch {
        // non-critical
      }
    }
    setTimeout(() => {
      setPlutonium(40); setPlasma(35); setWarpCore(45); setVentActive(false);
    }, 1800);
  };

  return (
    <div className={`p-4 bg-brand-bg/95 border rounded-xl flex flex-col justify-between h-48 select-none relative overflow-hidden transition-all duration-300 ${ventActive ? "border-brand-lime shadow-[0_0_12px_rgba(220,241,11,0.25)]" : isOverload ? "border-brand-pink animate-pulse shadow-[0_0_15px_#FD1EB1]" : "border-brand-pale/10"}`}>
      <div className="flex items-center justify-between mb-1.5 z-10">
        <span className="flex items-center space-x-1 font-mono text-[9px] text-[#DCF10B] uppercase tracking-widest">
          <Flame size={12} className={isOverload ? "text-brand-pink animate-bounce" : "text-brand-lime"} />
          <span>FUSION CORE THERMALS</span>
        </span>
        <span className={`font-mono text-[8px] px-1 py-0.2 rounded ${ventActive ? "bg-brand-lime/25 text-brand-lime" : isOverload ? "bg-brand-pink/25 text-brand-pink animate-ping" : "bg-brand-lime/10 text-brand-lime"}`}>
          {ventActive ? "VENT_BLOWING" : isOverload ? "⚠️ RETRO_OVERLOAD" : "SYS_STABLE"}
        </span>
      </div>
      <div className="space-y-1.5 flex-grow justify-center flex flex-col z-10">
        {[{ label: "PLUTONIUM SHIELD FLUX", value: plutonium, color: "#DCF10B", set: setPlutonium },
          { label: "plasma CONDENSATE", value: plasma, color: "#18BEC7", set: setPlasma },
          { label: "WARP CORE STRETCH", value: warpCore, color: "#FD1EB1", set: setWarpCore },
        ].map((s) => (
          <div key={s.label} className="space-y-0.5">
            <div className="flex justify-between font-mono text-[7px] text-brand-pale/50 uppercase">
              <span>{s.label}</span>
              <span style={{ color: s.color }}>{s.value}%</span>
            </div>
            <input type="range" min="10" max="100" value={s.value} disabled={ventActive}
              onChange={(e) => { soundEngine.playHover(); s.set(Number(e.target.value)); }}
              className="w-full bg-[#090b1c] h-1.5 rounded cursor-pointer"
              style={{ accentColor: s.color }}
              aria-label={s.label}
            />
          </div>
        ))}
      </div>
      <div className="h-7 flex items-center justify-center mt-1 z-10">
        <AnimatePresence mode="wait">
          {ventActive ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="w-full h-full text-center flex items-center justify-center bg-brand-lime/10 border border-brand-lime text-brand-lime font-mono text-[8.5px] rounded animate-pulse">
              COOLANT STEAM FLOOD VENTING... {Math.round(averageLoad)}°C
            </motion.div>
          ) : isOverload ? (
            <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: [1, 1.03, 1], opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={triggerEmergencyClean}
              className="w-full h-full bg-brand-pink text-white flex items-center justify-center gap-1 font-mono text-[8px] font-bold rounded animate-pulse cursor-pointer border border-[#111232] shadow-[0_0_10px_#FD1EB1] hover:bg-brand-pink/90">
              <ShieldAlert size={12} className="animate-bounce" />
              EMERGENCY COOLANT DEPRESSURIZE!
            </motion.button>
          ) : (
            <div className="w-full h-full flex items-center justify-between px-2 bg-[#090b1c] rounded border border-brand-lime/15 text-[8.5px] font-mono text-brand-pale/70">
              <span>WARP COMPOSER FLUX:</span>
              <span className="text-brand-lime font-bold">{Math.round(averageLoad)}%</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
