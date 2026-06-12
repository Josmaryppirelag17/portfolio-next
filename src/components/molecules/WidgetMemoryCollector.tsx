"use client";

import { useState } from "react";
import { Cpu, RefreshCw } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import WidgetShell from "@/components/atoms/WidgetShell";

export default function WidgetMemoryCollector() {
  const [percent, setPercent] = useState(78);
  const [purging, setPurging] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "// SYS STATS LOADED OK.",
    "// STANDBY CACHE READY FOR SCRUB.",
  ]);

  const runGarbagePurge = () => {
    if (purging) return;
    soundEngine.playSuccess();
    setPurging(true);
    setPercent(78);

    const steps = [
      { text: "SCANNING CACHED CORRUPTION SECTORS...", pct: 78 },
      { text: "KILLING IMPOSING residual_doubts.dll...", pct: 54 },
      { text: "PURGING FAKE SYNDROMES (imposter_syndrome.bin)...", pct: 36 },
      { text: "RECONSOLIDATING NEURAL SYNAPSE FIBERS...", pct: 18 },
      { text: "OPTIMIZATION COMPLETE: INTELLECT OVERCLOCK ACTIVE!", pct: 21 },
    ];

    setLogs(["// INITIATING RAM INTELLECT CELL SCRUB..."]);
    steps.forEach((step, idx) => {
      setTimeout(
        () => {
          setPercent(step.pct);
          setLogs((prev) => [step.text, ...prev.slice(0, 4)]);
          if (idx === steps.length - 1) {
            setPurging(false);
            soundEngine.playSuccess();
          } else soundEngine.playHover();
        },
        (idx + 1) * 650,
      );
    });
  };

  return (
    <WidgetShell title="Cognitive RAM scrub" icon={Cpu} status="CACHE_WIPE">
      <div className="flex-grow w-full bg-[#090b1c] rounded border border-brand-pale/5 flex p-2.5 space-x-3 items-center mb-1.5 overflow-hidden">
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-brand-bg flex items-center justify-center text-[10px] font-mono font-bold text-white relative">
            <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/5"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-lime transition-all duration-300"
                strokeDasharray={`${percent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                style={{ filter: "drop-shadow(0px 0px 4px #DCF10B)" }}
              />
            </svg>
            <span className="z-10">{percent}%</span>
          </div>
        </div>
        <div className="flex-grow h-14 overflow-hidden flex flex-col justify-end">
          {logs.slice(0, 3).map((line, lid) => (
            <div
              key={lid}
              className="font-mono text-[7px] text-brand-pale/60 tracking-wider truncate mb-0.5"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={runGarbagePurge}
        disabled={purging}
        className={`w-full py-1.5 rounded cursor-pointer flex items-center justify-center space-x-1.5 font-mono text-[9px] font-bold transition-all border ${purging ? "bg-brand-lime/10 border-brand-lime/40 text-brand-lime animate-pulse text-opacity-50" : "bg-brand-bg border-brand-lime text-brand-lime shadow-[0_0_8px_rgba(220,241,11,0.2)] hover:bg-brand-lime/15"}`}
      >
        <RefreshCw size={11} className={purging ? "animate-spin" : ""} />
        <span>{purging ? "EXECUTING PURGE SYSTEM DATA" : "SCRUB COGNITIVE CACHE RAM"}</span>
      </button>
    </WidgetShell>
  );
}
