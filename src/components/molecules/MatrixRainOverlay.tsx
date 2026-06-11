"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { setupCanvas } from '@/hooks/useCanvas';

export default function MatrixRainOverlay({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, window.innerWidth, window.innerHeight);
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", resizeCanvas);

    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const charsArr = matrixChars.split("");
    const fontSize = 14;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const rainDrops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));

    let frameId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FF66";
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < rainDrops.length; i++) {
        const text = charsArr[Math.floor(Math.random() * charsArr.length)]!;
        const yCoord = rainDrops[i]! * fontSize;
        if (yCoord >= 0) ctx.fillText(text, i * fontSize, yCoord);
        if (yCoord > window.innerHeight && Math.random() > 0.975) rainDrops[i] = 0;
        rainDrops[i]!++;
      }
      frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-[#00ff66] flex flex-col items-center justify-center font-mono select-none px-6">
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
        />
      )}
      <div className="relative z-10 text-center space-y-6 max-w-xl p-6 sm:p-8 bg-black/95 border-3 border-[#00ff66] rounded-xl shadow-[0_0_50px_rgba(0,255,102,0.4)]">
        <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase mb-1 flex items-center justify-center space-x-2.5 animate-pulse">
          <span aria-hidden="true">[===] </span>MATRIX_BYPASS_ENGAGED<span aria-hidden="true"> [===]</span>
        </h2>
        <div className="h-0.5 w-full bg-[#00ff66] mb-3" />
        <p className="text-xs text-left leading-relaxed text-[#00ff66]/90 font-mono space-y-1">
          &gt; EXECUTING SUPER-INTELLIGENT KERNEL HIJACK... SUCCESS
          <br />&gt; OVERRIDING COMPILER THREAD CACHE CODES: OK
          <br />&gt; ARCHITECTURE TINT RECONFIGURED TO NEON HACKER GREEN
          <br />&gt; ALL SOUND ESCALATION GATES: PRE-LIMIT AMPLIFIED
        </p>
        <div className="bg-[#051c08] p-4 rounded border border-[#00ff66]/30 font-mono text-[9px] sm:text-[10px] text-left text-[#00ff66] leading-relaxed select-all">
          SYS_OPERATOR: JOSMARY_CRYPT_MAIN
          <br />FUSION_CORE_TINT: LIME_OVERCLOCK_ACTIVE
          <br />COMPILE_HEALTH: 100% UNINTERRUPTED
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#00ff66] text-black font-extrabold text-xs tracking-wider uppercase border-2 border-transparent hover:bg-black hover:text-[#00ff66] hover:border-[#00ff66] transition-all cursor-pointer"
        >
          [ DISMISS BYPASS INTERRUPT ]
        </button>
      </div>
    </div>
  );
}