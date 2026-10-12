"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** A single leaf with its vein, filled with the current colour. */
export function Leaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 28" className={className} style={style} aria-hidden="true">
      <path d="M10 1C15 6 17 13 13.5 20 12.4 22 11.2 23.4 10 24.5 8.8 23.4 7.6 22 6.5 20 3 13 5 6 10 1Z" fill="currentColor" />
      <path d="M10 4V27M10 11l3-2.5M10 15.5l3.4-2.8M10 11 7 8.5M10 15.5 6.6 12.7" stroke="rgba(70,35,18,0.35)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/**
 * A simple half pumpkin rising out of the top edge of an eyebrow pill, with softly glowing eyes.
 * Its base fades into the pill so the two read as one piece.
 */
export function PillPumpkin() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute bottom-[calc(100%-2px)] left-1/2 -translate-x-1/2 opacity-[0.72]">
      <svg viewBox="0 0 30 14" className="block h-[15px] w-auto overflow-visible">
        <defs>
          <linearGradient id="pkHalf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d98a4a" />
            <stop offset="70%" stopColor="#c46f36" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c46f36" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M14.6 4.2c-.1-1.5.4-2.8 1.5-3.6" stroke="#6e5a34" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M1 14C1 8.2 3.6 5 7.4 5c1.4 0 2.6.4 3.6 1 1.2-.9 2.6-1.3 4-1.3s2.8.4 4 1.3c1-.6 2.2-1 3.6-1C26.4 5 29 8.2 29 14Z" fill="url(#pkHalf)" />
        <path d="M11 6c-1 2.2-1.4 5-1.2 8M19 6c1 2.2 1.4 5 1.2 8" stroke="#a8582a" strokeWidth="0.6" fill="none" opacity="0.45" />
        <g className="pumpkin-eyes" fill="#ffd27a">
          <path d="M8.4 12.4 10.4 9.2l2 3.2Z" />
          <path d="M17.6 12.4l2-3.2 2 3.2Z" />
        </g>
      </svg>
    </span>
  );
}

/**
 * Pumpkin hints on the glass header: carved, glowing eyes beside the wordmark and a few rib lines
 * that are placed only in the free gaps, so they never cross the logo, the text or the eyes.
 */
export function HeaderPumpkin() {
  const ref = useRef<HTMLSpanElement>(null);
  const [ribs, setRibs] = useState<{ x: number; out: boolean }[]>([]);

  useEffect(() => {
    const el = ref.current;
    const header = el?.parentElement;
    if (!el || !header) return;
    const place = () => {
      const box = header.getBoundingClientRect();
      const pad = 8;
      const busy: [number, number][] = [];
      const add = (r: DOMRect) => r.width > 0 && busy.push([r.left - box.left - pad, r.right - box.left + pad]);
      for (const child of Array.from(header.children)) {
        if (child === el) continue;
        // use the visible pieces inside each group (e.g. language links and menu button)
        const parts = child.children.length ? Array.from(child.children) : [child];
        parts.forEach((p) => add(p.getBoundingClientRect()));
      }
      el.querySelectorAll("[data-eye]").forEach((e) => add(e.getBoundingClientRect()));
      busy.sort((a, b) => a[0] - b[0]);
      const free: [number, number][] = [];
      let cursor = box.height * 0.6; // keep clear of the rounded ends
      for (const [a, b] of busy) {
        if (a > cursor) free.push([cursor, a]);
        cursor = Math.max(cursor, b);
      }
      if (box.width - box.height * 0.6 > cursor) free.push([cursor, box.width - box.height * 0.6]);
      setRibs(free.filter(([a, b]) => b - a >= 14).map(([a, b]) => ({ x: (a + b) / 2, out: (a + b) / 2 < box.width / 2 })));
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
      {ribs.map((r, i) => (
        <svg key={i} viewBox="0 0 10 48" preserveAspectRatio="none" className="absolute top-0 h-full w-2.5 opacity-25" style={{ left: r.x - 5 }}>
          <path d={r.out ? "M8 1C1 13 1 35 8 47" : "M2 1C9 13 9 35 2 47"} stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
      <span className="absolute inset-0 flex items-center justify-between px-[22%] opacity-50">
        {[false, true].map((flip, i) => (
          <svg
            key={i}
            data-eye
            viewBox="0 0 40 20"
            className="pumpkin-eyes h-3.5 w-auto"
            style={{ transform: flip ? "scaleX(-1)" : undefined, filter: "drop-shadow(0 0 3px #ffcf5a) drop-shadow(0 0 7px rgba(255,160,50,0.85))" }}
          >
            {/* angry carved eye: high outer corner, sharp point dipping toward the nose */}
            <path d="M2 3 37 15c-6 4-15 5-23 1.5C7.5 13.6 3.4 9.2 2 3Z" fill="#ffc45e" />
          </svg>
        ))}
      </span>
    </span>
  );
}

/** Small line-art pumpkin. */
export function Pumpkin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M12 7.5c-1.2-1-3.5-1.2-5.2-.3C4.5 8.4 3.5 11 3.8 13.8c.4 3.6 3 5.7 5.6 5.7.9 0 1.7-.3 2.6-.8.9.5 1.7.8 2.6.8 2.6 0 5.2-2.1 5.6-5.7.3-2.8-.7-5.4-3-6.6-1.7-.9-4-.7-5.2.3Z" />
      <path d="M12 7.5c-1 2.2-1.2 7.6 0 11.2M12 7.5c1 2.2 1.2 7.6 0 11.2M12 7.5c.1-1.6.8-2.8 2.2-3.5" />
    </svg>
  );
}

/** Bat seen from the front: body plus two wings that beat around the shoulders. */
function Bat({ className = "", flap = 0.38, phase = 0 }: { className?: string; flap?: number; phase?: number }) {
  const wing =
    "M1.4 -1.8C6 -7 13 -9.2 21 -6.4 19 -4.4 18.6 -2.2 19.6 0 17.2 -1 15 -.6 14 1.6 12.4 -.2 10 -.2 8.6 1.9 7 .6 4.6.6 3.1 2.6 2.2 1.2 1.7 0 1.4 -1.8Z";
  const timing = { animationDuration: `${flap}s`, animationDelay: `${-phase}s` };
  return (
    <svg viewBox="-22 -12 44 24" className={`overflow-visible ${className}`} aria-hidden="true">
      <g className="bat-body" style={timing}>
        <path className="bat-wing" style={timing} d={wing} fill="currentColor" />
        <g transform="scale(-1 1)">
          <path className="bat-wing" style={timing} d={wing} fill="currentColor" />
        </g>
        <ellipse cx="0" cy="1" rx="2.3" ry="4" fill="currentColor" />
        <path d="M-2 -3.2-2.4 -6.6-.8 -4.6H.8L2.4 -6.6 2-3.2C1.6 -1.8-1.6 -1.8-2 -3.2Z" fill="currentColor" />
      </g>
    </svg>
  );
}

// each pass is a loose curve across the area: x and y in vw/vh, with a gentle bank (rotate)
type Flight = { size: string; delay: number; duration: number; x: number[]; y: number[]; r: number[]; flap: number; repeatDelay: number };

const flights: Flight[] = [
  { size: "w-8", delay: 4, duration: 15, x: [-12, 20, 48, 78, 112], y: [18, 12, 20, 9, 15], r: [6, -8, 5, -6, 4], flap: 0.42, repeatDelay: 11 },
  { size: "w-6", delay: 7, duration: 18, x: [112, 80, 52, 24, -12], y: [26, 31, 22, 28, 19], r: [-5, 7, -6, 5, -4], flap: 0.36, repeatDelay: 15 },
  { size: "w-5", delay: 12, duration: 21, x: [-10, 30, 55, 85, 112], y: [9, 16, 7, 14, 6], r: [4, -6, 7, -5, 3], flap: 0.33, repeatDelay: 18 },
];

/** Quicker, scattered passes for the short loading screen, plus little ones flitting in the corners. */
export const introFlights: Flight[] = [
  { size: "w-12", delay: 0, duration: 3.4, x: [-14, 6, 22, 36, 52, 70, 90, 112], y: [24, 19, 22, 13, 17, 10, 15, 12], r: [8, -6, 9, -10, 5, -7, 6, 3], flap: 0.4, repeatDelay: 1 },
  { size: "w-8", delay: 0.4, duration: 3.6, x: [114, 96, 82, 64, 50, 32, 12, -14], y: [64, 68, 62, 69, 60, 66, 61, 58], r: [-6, 8, -9, 6, -7, 9, -5, -3], flap: 0.34, repeatDelay: 1 },
  { size: "w-10", delay: 0.8, duration: 3.2, x: [-14, 4, 20, 34, 52, 68, 88, 112], y: [84, 79, 83, 74, 79, 71, 76, 73], r: [5, -9, 7, -6, 9, -8, 5, 2], flap: 0.37, repeatDelay: 1 },
  { size: "w-7", delay: 0.2, duration: 3.8, x: [114, 98, 80, 66, 46, 30, 10, -14], y: [8, 12, 6, 13, 7, 11, 5, 4], r: [-4, 7, -8, 5, -6, 8, -4, -2], flap: 0.31, repeatDelay: 1 },
  // corners: small bats looping on the spot
  { size: "w-4", delay: 0.1, duration: 2.6, x: [4, 9, 14, 10, 5, 8, 4], y: [5, 3, 7, 10, 8, 4, 5], r: [6, -8, 4, -6, 8, -4, 6], flap: 0.27, repeatDelay: 0 },
  { size: "w-5", delay: 0.3, duration: 2.8, x: [84, 79, 74, 78, 85, 81, 84], y: [3, 6, 4, 8, 6, 2, 3], r: [-6, 8, -4, 7, -8, 5, -6], flap: 0.29, repeatDelay: 0 },
  { size: "w-4", delay: 0.2, duration: 2.5, x: [6, 11, 15, 10, 4, 7, 6], y: [90, 87, 91, 94, 92, 88, 90], r: [4, -6, 8, -5, 6, -7, 4], flap: 0.26, repeatDelay: 0 },
  { size: "w-5", delay: 0, duration: 2.7, x: [86, 81, 77, 82, 88, 84, 86], y: [88, 91, 86, 84, 89, 92, 88], r: [-5, 7, -6, 8, -4, 6, -5], flap: 0.3, repeatDelay: 0 },
];

/** A few bats flitting across on loose curves, now and then: a quiet nod to Halloween. */
export function Bats({ className = "absolute inset-0", items = flights, color = "text-ink/55" }: { className?: string; items?: Flight[]; color?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {items.map((f, i) => (
        <motion.div
          key={i}
          className={`absolute left-0 top-0 ${f.size} ${color}`}
          initial={{ x: `${f.x[0]}vw`, y: `${f.y[0]}vh`, opacity: 0 }}
          animate={{ x: f.x.map((v) => `${v}vw`), y: f.y.map((v) => `${v}vh`), rotate: f.r, opacity: f.x.map((_, k, a) => (k === 0 || k === a.length - 1 ? 0 : 0.85)) }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, repeatDelay: f.repeatDelay, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ x: [0, 2.5, -1.5, 3, -2, 0], y: [0, -3, 1.5, -1, 2.5, 0] }}
            transition={{ duration: 1.3 + (i % 3) * 0.35, repeat: Infinity, ease: "easeInOut", times: [0, 0.18, 0.42, 0.6, 0.82, 1] }}
          >
            <Bat className="h-auto w-full" flap={f.flap} phase={i * 0.13} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/** Thin crescent moon with a soft glow, for the loading screen. */
export function Moon({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="moonGlow">
          <stop offset="0%" stopColor="#f6dcae" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f6dcae" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#moonGlow)" />
      <path d="M24 9a11 11 0 1 0 7 19.5A12.5 12.5 0 0 1 24 9Z" fill="#fbecd0" opacity="0.9" />
    </motion.svg>
  );
}

/** Line-art branch with a few leaves, used as a corner ornament. */
export function Branch({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const leaves: [number, number, number, string][] = [
    [30, 22, -60, "#c26a43"], [52, 30, -20, "#d6a24a"], [70, 46, 15, "#a8552e"], [86, 62, -35, "#d08a3c"], [98, 82, 30, "#c26a43"],
  ];
  return (
    <svg viewBox="0 0 130 110" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M2 4C40 10 70 28 92 56s24 42 30 52" stroke="#8a5a3a" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7" />
      {leaves.map(([x, y, r, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(0.62)`}>
          <path d="M0-14C5-9 7-2 3.5 5 2.4 7 1.2 8.4 0 9.5-1.2 8.4-2.4 7-3.5 5-7-2-5-9 0-14Z" fill={c} opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}
