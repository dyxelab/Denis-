"use client";

import { useEffect, useRef } from "react";

// warm autumn tones, a little transparent so the leaves stay in the background
const tones = ["208,138,60", "181,83,42", "201,162,79", "138,58,42", "168,104,52"];

/** A few slowly falling, turning leaves on one canvas; pauses when hidden and respects reduced motion. */
export default function Leaves({ count = 8, className = "fixed inset-0 z-[35]" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
    };
    resize();
    const leaves = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 6 + Math.random() * 6, s: 0.13 + Math.random() * 0.18,
      d: Math.random() * Math.PI * 2, a: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI * 2, c: tones[i % tones.length], o: 0.38 + Math.random() * 0.26,
    }));
    const leaf = (r: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.bezierCurveTo(r * 0.75, -r * 0.55, r * 0.7, r * 0.45, 0, r);
      ctx.bezierCurveTo(-r * 0.7, r * 0.45, -r * 0.75, -r * 0.55, 0, -r);
      ctx.fill();
      // central vein and a short stem
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.8);
      ctx.lineTo(0, r * 1.35);
      ctx.stroke();
    };
    const tick = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const l of leaves) {
        l.y += l.s; l.d += 0.005; l.x += Math.sin(l.d) * 0.32; l.a += l.spin * 0.7 + Math.sin(l.d) * 0.003; l.flip += 0.008;
        if (l.y > h + 20) { l.y = -20; l.x = Math.random() * w; }
        ctx.setTransform(dpr, 0, 0, dpr, l.x * dpr, l.y * dpr);
        ctx.rotate(l.a);
        ctx.scale(0.35 + 0.65 * Math.abs(Math.cos(l.flip)), 1); // gentle tumbling
        ctx.fillStyle = `rgba(${l.c},${l.o})`;
        ctx.strokeStyle = `rgba(90,45,25,${l.o * 0.45})`;
        ctx.lineWidth = 0.7;
        leaf(l.r);
      }
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVis); };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
