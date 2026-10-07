"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { ArrowRight } from "./Icons";

const keys = ["voucherGift", "facial", "portrait", "voucher", "hands", "product"] as const;
const N = keys.length;
const slides = [...keys, ...keys, ...keys]; // three copies so the loop can wrap invisibly
const INTERVAL = 3200;

/** Centered, auto-advancing infinite carousel: the active photo sits in the middle, mirrored by its neighbours. */
export default function Works({ dict }: { dict: Dictionary["works"] }) {
  const frame = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(N);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState({ width: 0, card: 280, gap: 24 });

  useEffect(() => {
    const measure = () => {
      const width = frame.current?.clientWidth ?? 0;
      const card = width < 640 ? Math.round(width * 0.68) : 320;
      setDims({ width, card, gap: width < 640 ? 14 : 28 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setInstant(false);
    setIndex((i) => i + dir);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, go]);

  // after sliding into the outer copies, jump back to the middle copy without animation
  const onSettled = () => {
    if (index >= 2 * N || index < N) {
      setInstant(true);
      setIndex((i) => ((i % N) + N) % N + N);
    }
  };

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  const step = dims.card + dims.gap;
  const x = dims.width / 2 - dims.card / 2 - index * step;
  const active = ((index % N) + N) % N;

  return (
    <section id="works" className="overflow-hidden bg-sand py-20 md:py-28">
      <SectionHeading eyebrow={dict.eyebrow} title={dict.title} icon="heart" align="center" className="px-5" />
      <p className="mx-auto mt-5 max-w-lg px-5 text-center font-light leading-relaxed text-mocha">{dict.text}</p>

      <div
        ref={frame}
        className="relative mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
      >
        <motion.div
          className="flex items-center"
          style={{ gap: dims.gap }}
          animate={{ x }}
          transition={instant ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 18 }}
          onAnimationComplete={onSettled}
          drag="x"
          dragConstraints={{ left: x, right: x }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) go(1);
            else if (info.offset.x > 40) go(-1);
          }}
        >
          {slides.map((key, i) => {
            const isActive = i === index;
            return (
              <motion.figure
                key={i}
                className="shrink-0 cursor-grab active:cursor-grabbing"
                style={{ width: dims.card }}
                animate={{ scale: isActive ? 1 : 0.84, opacity: isActive ? 1 : 0.55 }}
                transition={instant ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] rounded-t-[999px] bg-sand-deep shadow-xl shadow-espresso/10">
                  <Image
                    src={images[key].src}
                    alt={dict.captions[key]}
                    fill
                    draggable={false}
                    sizes="(min-width: 640px) 320px, 68vw"
                    className="pointer-events-none object-cover"
                  />
                </div>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-5 px-5">
        <motion.p key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="display text-3xl italic text-espresso">
          {dict.captions[keys[active]]}
        </motion.p>
        <div className="flex items-center gap-5">
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <div className="flex gap-2">
            {keys.map((k, i) => (
              <button
                key={k}
                type="button"
                aria-label={dict.captions[k]}
                onClick={() => {
                  setInstant(false);
                  setIndex(N + i);
                }}
                className="relative h-1.5 w-6 overflow-hidden rounded-full bg-espresso/15"
              >
                {i === active && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-espresso"
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Next" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
