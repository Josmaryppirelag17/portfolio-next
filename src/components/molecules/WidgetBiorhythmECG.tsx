"use client";

import { useRef, useEffect, useState } from "react";
import { Activity, Heart } from "lucide-react";
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function WidgetBiorhythmECG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [bpm, setBpm] = useState(75);
  const [cortisol, setCortisol] = useState(32);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 170;
    let height = canvas.height = 100;
    let x = 0;
    const points: number[] = new Array(width).fill(height / 2);
    let frameId: number;

    const animateECG = () => {
      ctx.fillStyle = "rgba(17, 18, 50, 0.12)";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(24, 190, 199, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 16) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke(); }
      for (let j = 0; j < height; j += 16) { ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(width, j); ctx.stroke(); }

      const pulseCycle = (60 / bpm) * 60;
      const step = x % Math.round(pulseCycle);
      let displacement = height / 2;

      if (step > 15 && step < 20) displacement -= 4;
      else if (step === 25) displacement += 6;
      else if (step === 26 || step === 27) displacement -= 35;
      else if (step === 28 || step === 29) displacement += 15;
      else if (step > 35 && step < 44) displacement -= 9;

      points.push(displacement);
      if (points.length > width) points.shift();

      ctx.beginPath();
      ctx.moveTo(0, points[0]!);
      for (let k = 1; k < points.length; k++) ctx.lineTo(k, points[k]!);
      ctx.strokeStyle = "#18BEC7";
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "#18BEC7";
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.shadowBlur = 0;
      x++;
      frameId = requestAnimationFrame(animateECG);
    };

    animateECG();

    const resizeObserver = new ResizeObserver(() => {
      if (canvasRef.current) {
        width = canvas.width = canvasRef.current.clientWidth || 170;
        height = canvas.height = canvasRef.current.clientHeight || 100;
      }
    });
    resizeObserver.observe(canvas);

    return () => { cancelAnimationFrame(frameId); resizeObserver.disconnect(); };
  }, [bpm, reducedMotion]);

  return (
    <div className="p-4 bg-brand-bg/95 border border-brand-pale/10 rounded-xl flex flex-col justify-between h-48 select-none relative overflow-hidden">
      <div className="flex items-center justify-between mb-1 z-10">
        <span className="flex items-center space-x-1 font-mono text-[9px] text-brand-cyan uppercase tracking-widest">
          <Activity size={12} className="text-brand-cyan animate-pulse" />
          <span>Biometric Monitor</span>
        </span>
        <span className="font-mono text-[8px] text-brand-cyan/60 uppercase">CARDIO_SYNC</span>
      </div>
      <div className="flex-grow w-full h-[70px] rounded bg-[#090b1c] border border-brand-cyan/15 relative overflow-hidden mb-1.5">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
        <div className="absolute top-2 right-2 bg-brand-bg/90 border border-brand-cyan/20 px-2 py-0.5 rounded flex items-center space-x-1">
          <Heart size={9} className="text-brand-pink fill-brand-pink animate-ping" />
          <span className="font-mono text-[8px] font-bold text-[#DBEAEC]">{bpm} BPM</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 z-10">
        <div>
          <div className="flex justify-between font-mono text-[7px] text-brand-pale/50 uppercase mb-0.5">
            <span>STIMULATED PULSE:</span>
            <span className="text-brand-cyan">{bpm} BPM</span>
          </div>
          <input type="range" min="60" max="180" value={bpm}
            onChange={(e) => { setBpm(Number(e.target.value)); setCortisol(Math.round(30 + (Number(e.target.value) - 60) * 0.5)); }}
            className="w-full accent-brand-cyan bg-[#090b1c] h-1 rounded cursor-pointer"
            aria-label="Stimulated pulse BPM" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between font-mono text-[7px] text-brand-pale/50 uppercase">
            <span>SYNAPSE EFF:</span>
            <span className="text-[#DCF10B]">{cortisol}%</span>
          </div>
          <div className="h-3 w-full bg-[#0a0c1f] rounded border border-brand-pale/5 p-0.5 flex">
            <div className="h-full bg-brand-lime rounded-xs" style={{ width: `${cortisol}%`, transition: 'width 0.2s ease', boxShadow: '0 0 6px #DCF10B' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
