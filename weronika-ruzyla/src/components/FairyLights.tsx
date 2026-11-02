"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// warm whites and golds with a few red and green bulbs: festive but not loud
const palette = ["#fff3d6", "#f2c86b", "#fff3d6", "#d7263d", "#f2c86b", "#fff3d6", "#2f9e6a"];

/** Ring of tiny twinkling bulbs around the logo on the loading screen. */
export function LogoLights({ count = 22 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-7 -inset-y-6">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const color = palette[i % palette.length];
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.045 }}
          >
            <span
              className="twinkle block h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 6px 2px ${color}aa, 0 0 14px 4px ${color}44`,
                animationDelay: `${((i * 37) % 23) / 10}s`,
                animationDuration: `${1.6 + ((i * 13) % 9) / 10}s`,
              }}
            />
          </motion.span>
        );
      })}
    </div>
  );
}

/** A tiny garland of bulbs along the top edge of a pill. */
export function PillLights({
  count = 7,
  size = 3,
  className = "inset-x-3 -top-[3px]",
}: {
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute flex justify-between ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const color = palette[(i * 3) % palette.length];
        return (
          <span
            key={i}
            className="twinkle block rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${size + 1}px ${size / 3}px ${color}99`,
              transform: `translateY(${i % 2 ? Math.max(1, size - 1) : 0}px)`,
              animationDelay: `${((i * 29) % 17) / 10}s`,
              animationDuration: `${1.8 + ((i * 7) % 8) / 10}s`,
            }}
          />
        );
      })}
    </span>
  );
}

/** Tiny bulbs running all the way around the header pill, sitting on its border. */
export function HeaderLights({ gap = 22, size = 2 }: { gap?: number; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // walk the stadium outline: top edge, right cap, bottom edge, left cap
  const points: [number, number][] = [];
  const { w, h } = box;
  if (w > h && h > 0) {
    const r = h / 2;
    const straight = w - h;
    const total = 2 * straight + 2 * Math.PI * r;
    const n = Math.round(total / gap);
    for (let i = 0; i < n; i++) {
      let d = (i / n) * total;
      if (d < straight) { points.push([r + d, 0]); continue; }
      d -= straight;
      if (d < Math.PI * r) { const a = -Math.PI / 2 + d / r; points.push([w - r + r * Math.cos(a), r + r * Math.sin(a)]); continue; }
      d -= Math.PI * r;
      if (d < straight) { points.push([w - r - d, h]); continue; }
      d -= straight;
      const a = Math.PI / 2 + d / r;
      points.push([r + r * Math.cos(a), r + r * Math.sin(a)]);
    }
  }

  return (
    <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90">
      {points.map(([x, y], i) => {
        const color = palette[(i * 3) % palette.length];
        return (
          <span
            key={i}
            className="twinkle absolute block rounded-full"
            style={{
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: `0 0 ${size + 2}px ${size / 2}px ${color}88`,
              animationDelay: `${((i * 29) % 17) / 10}s`,
              animationDuration: `${1.8 + ((i * 7) % 8) / 10}s`,
            }}
          />
        );
      })}
    </span>
  );
}
