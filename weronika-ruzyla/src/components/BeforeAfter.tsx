"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { results } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * Before/after comparison: the "before" photo is clipped over the "after" one and the
 * divider follows the finger. The position lives in a motion value, so dragging
 * never re-renders React and stays smooth on phones.
 */
export default function BeforeAfter({ dict }: { dict: Dictionary["results"] }) {
  const [index, setIndex] = useState(0);
  const pos = useMotionValue(50); // percent from the left
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(frame, { once: true, margin: "-20% 0px" });
  const [ariaPos, setAriaPos] = useState(50);

  // first time in view: sweep once so it is obvious the photo can be dragged
  useEffect(() => {
    if (!inView) return;
    const controls = animate(pos, [50, 22, 78, 50], { duration: 2.2, ease: "easeInOut", delay: 0.3 });
    return () => controls.stop();
  }, [inView, pos]);

  useEffect(() => pos.on("change", (v) => setAriaPos(Math.round(v))), [pos]);

  const moveTo = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    pos.stop();
    pos.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const select = (i: number) => {
    setIndex(i);
    animate(pos, 50, { duration: 0.5, ease: "easeOut" });
  };

  const pair = results[index];

  return (
    <section id="results" className="bg-sand px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
      <Reveal delay={0.1}>
        <p className="mx-auto mt-5 max-w-lg text-center leading-relaxed text-mocha">{dict.text}</p>
      </Reveal>

      <div className="no-scrollbar mx-auto mt-8 flex max-w-full justify-start gap-2 overflow-x-auto px-1 pb-1 sm:justify-center">
        {dict.items.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => select(i)}
            aria-pressed={index === i}
            className={`eyebrow shrink-0 rounded-full px-4 py-2.5 text-[0.58rem] transition-colors duration-300 ${
              index === i ? "bg-espresso text-ivory" : "glass-card text-mocha hover:text-espresso"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <Reveal delay={0.15} className="mx-auto mt-8 w-full max-w-[26rem]">
        <div
          ref={frame}
          className="relative aspect-[3/4] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[2rem] shadow-2xl shadow-espresso/20"
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            moveTo(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          role="slider"
          tabIndex={0}
          aria-label={`${dict.before} / ${dict.after}: ${dict.items[index]}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ariaPos}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - 5));
            if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + 5));
          }}
        >
          <Image src={pair.after} alt={`${dict.after}: ${dict.items[index]}`} fill draggable={false} sizes="(min-width: 640px) 26rem, 90vw" className="pointer-events-none object-cover" />
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <Image src={pair.before} alt={`${dict.before}: ${dict.items[index]}`} fill draggable={false} sizes="(min-width: 640px) 26rem, 90vw" className="pointer-events-none object-cover" />
          </motion.div>

          <span className="eyebrow pointer-events-none absolute border border-white/30 bg-ink/45 backdrop-blur-sm left-3 top-3 rounded-full px-3 py-1.5 text-[0.55rem] text-white">{dict.before}</span>
          <span className="eyebrow pointer-events-none absolute border border-white/30 bg-ink/45 backdrop-blur-sm right-3 top-3 rounded-full px-3 py-1.5 text-[0.55rem] text-white">{dict.after}</span>

          <motion.div className="pointer-events-none absolute inset-y-0 w-0" style={{ left }}>
            <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.25)]" />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full border border-white/70 bg-white/30 text-white shadow-lg backdrop-blur-md">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </span>
          </motion.div>
        </div>
        <p className="eyebrow mt-4 text-center text-[0.58rem] text-taupe">{dict.hint}</p>
      </Reveal>
    </section>
  );
}
