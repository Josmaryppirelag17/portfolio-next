"use client";

import { useState } from "react";
import { Skull } from "lucide-react";
import { soundEngine } from "./SoundEngine";
import WidgetMatrixRain from "@/components/molecules/WidgetMatrixRain";
import WidgetPocketSynth from "@/components/molecules/WidgetPocketSynth";
import WidgetCoreBalancer from "@/components/molecules/WidgetCoreBalancer";
import WidgetBiorhythmECG from "@/components/molecules/WidgetBiorhythmECG";
import WidgetMemoryCollector from "@/components/molecules/WidgetMemoryCollector";
import WidgetRetroTerminal from "@/components/molecules/WidgetRetroTerminal";

export default function CyberConsoleWidgets() {
  const [coreState, setCoreState] = useState<"stable" | "unstable" | "venting">("stable");
  const [glitchTriggered, setGlitchTriggered] = useState(false);

  const triggerGlitchMode = () => {
    soundEngine.playError();
    setGlitchTriggered(true);
    setTimeout(() => setGlitchTriggered(false), 1200);
  };

  const handleTriggerOverload = () => {
    triggerGlitchMode();
  };

  const handleCalmReactor = () => {};

  return (
    <section
      aria-label="Cybernetics diagnostics and telemetry dock"
      className="w-full relative py-8 px-6 bg-[#0c0d1e]/80 border-y-4 border-brand-bg relative overflow-hidden"
    >
      {glitchTriggered && (
        <div className="absolute inset-0 z-40 bg-brand-pink/15 backdrop-invert-[0.15] mix-blend-color-burn animate-hue-rotate pointer-events-none" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#18bec708,#00000000)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fd1eb105,#00000000)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2.5 mb-8 border-b-2 border-brand-pale/10 pb-4">
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-2 text-brand-lime font-mono text-[9px] tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime animate-ping" />
              <span>[ MODULE_SYS: SUB_SYSTEMS_OVERRIDE_ACTIVE ]</span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-black font-heading text-transparent uppercase text-outline-lime tracking-tight"
              style={{ WebkitTextStroke: "1px #DCF10B", color: "#DBEAEC" }}
            >
              CYBERNETIC DIAGNOSTICS & TELEMETRY DOCK
            </h3>
          </div>
          <div className="font-mono text-[8px] tracking-wider text-brand-pale/50 uppercase bg-[#111232] border border-brand-pale/5 px-2.5 py-1 rounded">
            MATRIX DATA OVERFLUIDITY GAUGE // PERSISTENCE: RETRO_POP_2026
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative transition-transform duration-300 ${glitchTriggered ? "translate-x-1 translate-y-[-1px] filter blur-[0.3px]" : ""}`}
        >
          <WidgetMatrixRain />
          <WidgetPocketSynth />
          <WidgetBiorhythmECG />
          <WidgetCoreBalancer onCoreStateChange={setCoreState} />
          <WidgetMemoryCollector />
          <WidgetRetroTerminal
            onTriggerGlitch={triggerGlitchMode}
            onTriggerOverload={handleTriggerOverload}
            onCalmReactor={handleCalmReactor}
          />
        </div>

        {coreState === "unstable" && (
          <div className="mt-6 p-3 bg-brand-pink/15 border-2 border-brand-pink rounded-xl flex items-center justify-between text-left animate-pulse">
            <div className="flex items-center space-x-3.5">
              <div className="w-4 h-4 rounded-full bg-brand-pink flex items-center justify-center animate-ping">
                <Skull size={11} className="text-white" />
              </div>
              <p className="font-mono text-[10.5px] text-brand-pink font-bold uppercase tracking-widest leading-none">
                CRITICAL WARNING: FUSION INTRUSION FLUX DETECTED! ADJUST CONSOLE ROD SLIDERS OR
                SCRIPT &apos;calm&apos; TO PREVENT RESET INITIATION!
              </p>
            </div>
          </div>
        )}

        {coreState === "venting" && (
          <div className="mt-6 p-3 bg-brand-lime/15 border-2 border-brand-lime rounded-xl flex items-center md:justify-start justify-between text-left">
            <div className="flex items-center space-x-3.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-ping" />
              <p className="font-mono text-[10.5px] text-brand-lime font-bold uppercase tracking-widest leading-none">
                ACTION: VENT SYSTEM IN PROGRESS. COOLANT FLOOD INTRUSION COMPRESSORS
                REMEDISTRIBUTING REACTOR THERMALS BACK TO Rest state.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
