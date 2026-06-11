import React, { useRef, useEffect, useCallback } from "react";

export function useCanvas(
  setup: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => (() => void) | void,
  deps: unknown[] = [],
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const rafRef = useRef<number>(0);

  const start = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    cleanupRef.current = setup(canvas, ctx) ?? null;
  }, deps);

  useEffect(() => {
    start();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) start();
        else if (cleanupRef.current) cleanupRef.current();
      },
      { threshold: 0 },
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [start]);

  return canvasRef;
}

export function getCanvasSafe(
  ref: React.RefObject<HTMLCanvasElement | null>,
  reducedMotion: boolean,
): CanvasRenderingContext2D | null {
  if (reducedMotion) return null;
  const canvas = ref.current;
  if (!canvas) return null;
  return canvas.getContext("2d");
}

export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.scale(dpr, dpr);
  return ctx;
}
