"use client";

import { useRef, useEffect, useState } from "react";
import { Code } from "lucide-react";
import { soundEngine } from "@/components/organisms/SoundEngine";
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function WidgetMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [colorScheme, setColorScheme] = useState<"lime" | "pink" | "cyan">("lime");
  const [speed, setSpeed] = useState(1.2);
  const [density, setDensity] = useState(0.65);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 170;
    let height = canvas.height = 140;
    const charList = "アカサタナハマヤラワガザダバパイウエオ0123456789%X_#@$◇◆";
    const fontSize = 8;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -20));
    let frameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(17, 18, 50, 0.15)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = colorScheme === "lime" ? "#DCF10B" : colorScheme === "pink" ? "#FD1EB1" : "#18BEC7";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (i % 2 === 0 && density < 0.5) continue;
        if (i % 3 === 0 && density < 0.3) continue;
        const text = charList[Math.floor(Math.random() * charList.length)]!;
        ctx.fillText(text, i * fontSize, drops[i]! * fontSize);
        if (drops[i]! * fontSize > height && Math.random() > 0.965) drops[i] = 0;
        drops[i]! += speed * (0.85 + Math.random() * 0.3);
      }
      frameId = requestAnimationFrame(draw);
    };

    draw();

    const resizeObserver = new ResizeObserver(() => {
      if (canvasRef.current) {
        width = canvas.width = canvasRef.current.clientWidth || 170;
        height = canvas.height = canvasRef.current.clientHeight || 140;
        columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -20));
      }
    });
    resizeObserver.observe(canvas);

    return () => { cancelAnimationFrame(frameId); resizeObserver.disconnect(); };
  }, [colorScheme, speed, density, reducedMotion]);

  return (
    <div className="p-4 bg-brand-bg/95 border border-brand-pale/10 rounded-xl flex flex-col justify-between h-48 select-none relative overflow-hidden">
      <div className="flex items-center justify-between mb-1.5 z-10">
        <span className="flex items-center space-x-1 font-mono text-[9px] text-[#DCF10B] uppercase tracking-widest">
          <Code size={11} className="text-brand-lime" />
          <span>Matrix Stream</span>
        </span>
        <span className="font-mono text-[8px] text-brand-pale/45 uppercase">[HOLO_GEN.EXE]</span>
      </div>
      <div className="flex-grow w-full h-[85px] rounded bg-[#090b1c] border border-brand-lime/10 relative overflow-hidden mb-2">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      </div>
      <div className="grid grid-cols-3 gap-1 z-10">
        <button onClick={() => { soundEngine.playClick(); setColorScheme(colorScheme === "lime" ? "cyan" : colorScheme === "cyan" ? "pink" : "lime"); }}
          className="py-1 rounded border border-[#DCF10B]/30 font-mono text-[7px] text-center bg-brand-bg/90 hover:bg-brand-lime/10 text-brand-lime transition-all">
          COLOR: {colorScheme.toUpperCase()}
        </button>
        <button onClick={() => { soundEngine.playHover(); setSpeed(prev => prev >= 2.0 ? 0.6 : prev + 0.45); }}
          className="py-1 rounded border border-brand-pale/10 font-mono text-[7px] text-center bg-brand-bg/90 hover:bg-white/5 text-brand-pale transition-all">
          SPEED: {speed.toFixed(1)}x
        </button>
        <button onClick={() => { soundEngine.playHover(); setDensity(prev => prev >= 0.8 ? 0.25 : prev + 0.25); }}
          className="py-1 rounded border border-brand-pale/10 font-mono text-[7px] text-center bg-brand-bg/90 hover:bg-white/5 text-brand-pale transition-all">
          DENSE: {Math.round(density * 100)}%
        </button>
      </div>
    </div>
  );
}
