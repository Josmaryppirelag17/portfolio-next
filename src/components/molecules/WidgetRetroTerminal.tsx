"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import WidgetShell from "@/components/atoms/WidgetShell";

interface RetroTerminalProps {
  onTriggerGlitch: () => void;
  onTriggerOverload: () => void;
  onCalmReactor: () => void;
}

export default function WidgetRetroTerminal({
  onTriggerGlitch,
  onTriggerOverload,
  onCalmReactor,
}: RetroTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([
    "SYSINIT_COMPLETE // CHIP ONLINE.",
    "WRITE 'help' TO QUERY CMD SCRIPTS.",
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;
    soundEngine.playClick();
    const newHistory = [...history, `> ${inputVal}`];

    if (cleanCmd === "help") {
      newHistory.push(
        "LIST OF PERMITTED CONSOLE PROMPT SCRIPTS:",
        " - 'glitch' : Simulate CSS chromatic aberration glitch lines",
        " - 'laser'  : Emit monophonic musical octave sweeping notes",
        " - 'overload' : Initiate core reactor uranium overdrive",
        " - 'calm'    : Emergency vent reactor rods to 40%",
        " - 'status'  : Query cognitive host and cybernetic diagnostics",
        " - 'clear'   : Wipe log buffers",
      );
    } else if (cleanCmd === "glitch") {
      newHistory.push("EXECUTING PROTOCOL: CHROMATIC GLITCH SCANLINES TRIGGERED OK.");
      onTriggerGlitch();
    } else if (cleanCmd === "laser") {
      newHistory.push("PLAYING MONOPHONIC CHIPTUNE SOUND WAVE SWEEPS...");
      soundEngine.playSuccess();
    } else if (cleanCmd === "overload") {
      newHistory.push("⚠️ WARNING: CRITICAL OVERLOAD COMMAND SENT TO REACTOR RODS!");
      onTriggerOverload();
    } else if (cleanCmd === "calm") {
      newHistory.push("VENTING COOLANT COMPOSITIONS MANUALLY...");
      onCalmReactor();
    } else if (cleanCmd === "status") {
      newHistory.push(
        "TELEMETRY_STATUS:",
        " - HOST_STATUS: COMPILER_STABLE",
        " - AVATAR: SKELETAL_CCDIK_ARM_V3.1",
        " - SOUND: RETRO_POCKET_OSC",
        " - LOCATION: MARACAIBO // MCBO HUB",
      );
    } else if (cleanCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      soundEngine.playError();
      newHistory.push(`CONSOLE_ERROR: SCRIPT '${cleanCmd}' NOT MAPPED IN TELEMETRY REGISTER.`);
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <WidgetShell
      title="CYBERNETIC CODES CONSOLE"
      icon={Terminal}
      iconColor="text-brand-pink"
      status="[HOST_TERM]"
    >
      <div
        ref={containerRef}
        className="flex-grow w-full h-[85px] rounded bg-[#090b1c] border border-brand-pink/15 p-2 font-mono text-[7px] text-brand-pale/80 overflow-y-auto mb-2 relative scroll-smooth selection:bg-brand-pink"
      >
        {history.map((line, index) => (
          <div key={index} className="leading-relaxed mb-0.5 tracking-wider font-light">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommandSubmit} className="flex gap-1.5 z-10">
        <span className="font-mono text-[#FD1EB1] text-[10px] self-center animate-pulse">
          {">"}
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help'..."
          className="flex-grow bg-[#090b1c] rounded border border-brand-pink/20 text-[#DBEAEC] px-2 py-1 font-mono text-[10px] focus:outline-none focus:border-brand-pink focus:shadow-[0_0_8px_rgba(253,30,177,0.3)] transition-all"
          aria-label="Terminal command"
        />
        <button
          type="submit"
          className="bg-[#090b1c] hover:bg-brand-pink/10 border border-[#FD1EB1]/30 text-[#FD1EB1] rounded px-3.5 py-1 text-[8.5px] font-mono tracking-widest cursor-pointer hover:border-brand-pink hover:text-white transition-all transition-colors"
        >
          EXECUTE
        </button>
      </form>
    </WidgetShell>
  );
}
