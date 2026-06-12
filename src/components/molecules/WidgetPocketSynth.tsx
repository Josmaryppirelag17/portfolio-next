"use client";

import { useState } from "react";
import { Radio } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import WidgetShell from "@/components/atoms/WidgetShell";

interface KeyData {
  label: string;
  hz: number;
  isWhite: boolean;
}

const keys: KeyData[] = [
  { label: "C", hz: 261.63, isWhite: true },
  { label: "C#", hz: 277.18, isWhite: false },
  { label: "D", hz: 293.66, isWhite: true },
  { label: "D#", hz: 311.13, isWhite: false },
  { label: "E", hz: 329.63, isWhite: true },
  { label: "F", hz: 349.23, isWhite: true },
  { label: "F#", hz: 369.99, isWhite: false },
  { label: "G", hz: 392.0, isWhite: true },
  { label: "G#", hz: 415.3, isWhite: false },
  { label: "A", hz: 440.0, isWhite: true },
  { label: "A#", hz: 466.16, isWhite: false },
  { label: "B", hz: 493.88, isWhite: true },
  { label: "C5", hz: 523.25, isWhite: true },
];

export default function WidgetPocketSynth() {
  const [oscType, setOscType] = useState<OscillatorType>("triangle");
  const [decay, setDecay] = useState(0.3);
  const [octave, setOctave] = useState(4);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const triggerNote = (baseHz: number, index: number) => {
    const multiplier = Math.pow(2, octave - 4);
    const finalHz = baseHz * multiplier;
    soundEngine.playSynthKey(finalHz);
    setActiveKey(index);
    setTimeout(() => setActiveKey(null), 150);

    if (typeof window !== "undefined") {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const testCtx = new AudioCtx();
        const osc = testCtx.createOscillator();
        const gain = testCtx.createGain();
        osc.type = oscType;
        osc.frequency.setValueAtTime(finalHz, testCtx.currentTime);
        const playVol = soundEngine.isEnabled() ? 0.16 : 0.02;
        gain.gain.setValueAtTime(playVol, testCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, testCtx.currentTime + decay);
        osc.connect(gain);
        gain.connect(testCtx.destination);
        osc.start();
        osc.stop(testCtx.currentTime + decay);
        setTimeout(() => testCtx.close(), decay * 1000 + 100);
      } catch {
        // non-critical
      }
    }
  };

  const cycleOsc = () => {
    soundEngine.playClick();
    const list: OscillatorType[] = ["sine", "square", "sawtooth", "triangle"];
    const idx = list.indexOf(oscType);
    setOscType(list[(idx + 1) % list.length]!);
  };

  return (
    <WidgetShell
      title="Monaural FM Synth"
      icon={Radio}
      iconColor="text-brand-pink animate-pulse"
      status="KEYBOARD ACTIVE"
    >
      <div className="grid grid-cols-3 gap-1 mb-2">
        <button
          onClick={cycleOsc}
          className="py-1 rounded border border-[#FD1EB1]/30 font-mono text-[7.5px] text-center bg-brand-bg/90 hover:bg-brand-pink/10 text-brand-pink transition-all uppercase"
          title="Change synthesis waveform parameters"
        >
          OSC: {oscType}
        </button>
        <button
          onClick={() => {
            soundEngine.playClick();
            setDecay((d) => (d >= 0.8 ? 0.15 : d + 0.15));
          }}
          className="py-1 rounded border border-brand-pale/10 font-mono text-[7.5px] text-center bg-brand-bg/90 hover:bg-white/5 text-brand-pale transition-all"
        >
          DECAY: {decay.toFixed(2)}s
        </button>
        <button
          onClick={() => {
            soundEngine.playClick();
            setOctave((oct) => (oct >= 6 ? 3 : oct + 1));
          }}
          className="py-1 rounded border border-brand-pale/10 font-mono text-[7.5px] text-center bg-brand-bg/90 hover:bg-white/5 text-brand-pale transition-all"
        >
          OCT: {octave}
        </button>
      </div>
      <div className="flex items-end h-20 w-full bg-[#0a0c1f] rounded border border-brand-pale/5 p-1 relative gap-0.5 overflow-hidden">
        {keys.map((k, idx) => (
          <button
            key={idx}
            onClick={() => triggerNote(k.hz, idx)}
            className={`flex-grow h-full rounded-sm relative text-[8px] font-mono flex flex-col justify-end items-center pb-1 transition-all ${k.isWhite ? (activeKey === idx ? "bg-brand-pink text-white shadow-[0_0_8px_#FD1EB1]" : "bg-brand-pale/90 text-brand-bg hover:bg-white") : activeKey === idx ? "bg-brand-cyan text-white h-[65%] z-10 shadow-[0_0_8px_#18BEC7]" : "bg-[#18192a] text-[#FD1EB1]/70 h-[65%] z-10 border border-brand-pink/20 hover:bg-[#20223a]"}`}
            style={{ boxShadow: activeKey === idx ? "0 0 10px rgba(253,30,177,0.7)" : "none" }}
          >
            <span>{k.label}</span>
          </button>
        ))}
      </div>
    </WidgetShell>
  );
}
