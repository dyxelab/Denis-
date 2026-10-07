"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { images } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ArrowRight } from "./Icons";

const items = [
  { key: "voucherGift", tall: false },
  { key: "facial", tall: true },
  { key: "portrait", tall: false },
  { key: "voucher", tall: true },
  { key: "hands", tall: false },
  { key: "product", tall: true },
] as const;

export default function Works({ dict }: { dict: Dictionary["works"] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const x = useMotionValue(0);
  const progress = useSpring(useTransform(x, (v) => (limit ? Math.min(1, Math.max(0, -v / limit)) : 0)), { stiffness: 200, damping: 30 });

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const next = Math.min(0, Math.max(-limit, x.get() - dir * 380));
    animate(x, next, { type: "spring", stiffness: 120, damping: 24 });
  };

  return (
    <section id="works" className="overflow-hidden bg-sand py-24 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} icon="heart" />
        <Reveal delay={0.2} className="max-w-sm">
          <p className="text-lg font-light leading-relaxed text-mocha">{dict.text}</p>
          <div className="mt-6 flex items-center gap-3">
            <button type="button" aria-label="Previous" onClick={() => nudge(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" aria-label="Next" onClick={() => nudge(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/30 transition-colors hover:bg-espresso hover:text-ivory">
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="eyebrow ml-3 text-[0.6rem] text-mocha">{dict.hint}</span>
          </div>
        </Reveal>
      </div>

      <div ref={viewport} className="mt-16 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          style={{ x }}
          className="flex w-max items-start gap-5 px-5 sm:gap-8 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {items.map(({ key, tall }, i) => {
            const img = images[key];
            return (
              <motion.figure
                key={key}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group shrink-0 ${tall ? "mt-0 w-[68vw] sm:w-[340px]" : "mt-16 w-[60vw] sm:w-[300px]"}`}
              >
                <div className={`relative overflow-hidden rounded-[1.75rem] bg-sand-deep ${tall ? "aspect-[3/4.4]" : "aspect-[3/3.6]"}`}>
                  <Image
                    src={img.src}
                    alt={dict.captions[key]}
                    fill
                    draggable={false}
                    sizes="(min-width: 640px) 340px, 68vw"
                    className="pointer-events-none object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-3 px-1">
                  <span className="display text-2xl italic text-espresso">{dict.captions[key]}</span>
                  <span className="eyebrow text-[0.6rem] text-mocha">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
        <div className="h-px w-full bg-espresso/15">
          <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-espresso" />
        </div>
      </div>
    </section>
  );
}
