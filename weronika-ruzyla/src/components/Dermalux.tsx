"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const colors = ["#5b8cff", "#ff5a5f", "#c23a5a"];

/** sine wave whose period grows with the wavelength, so the three lights look physically different */
function wavePath(period: number, amp = 18, width = 600, mid = 40) {
  let d = `M0 ${mid}`;
  for (let x = 0; x <= width; x += 4) d += ` L${x} ${(mid + Math.sin((x / period) * Math.PI * 2) * amp).toFixed(2)}`;
  return d;
}

export default function Dermalux({ dict, equipment }: { dict: Dictionary["dermalux"]; equipment: Dictionary["equipment"] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % dict.lights.length), 4000);
    return () => clearInterval(id);
  }, [paused, dict.lights.length]);

  const color = colors[active];

  return (
    <section id="dermalux" className="relative overflow-hidden bg-ink px-5 py-20 text-ivory sm:px-8 md:py-28">
      {/* ambient glow following the active wavelength */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        animate={{ backgroundColor: color, opacity: [0.22, 0.32, 0.22] }}
        transition={{ backgroundColor: { duration: 1.2 }, opacity: { duration: 4, repeat: Infinity } }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="md:order-2">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-sand">{dict.text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            {dict.tags.map((tag) => (
              <span key={tag} className="eyebrow rounded-full border border-ivory/20 px-4 py-2 text-[0.62rem] text-sand">
                {tag}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="md:order-1" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* LED panel */}
          <Reveal className="relative mx-auto aspect-square w-full max-w-[22rem] md:max-w-md">
            <div className="absolute inset-0 rounded-full border border-ivory/10" />
            <div className="absolute inset-[12%] rounded-full border border-ivory/10" />
            <motion.div
              className="absolute inset-[24%] rounded-full"
              animate={{
                backgroundColor: color,
                boxShadow: `0 0 80px 20px ${color}88, inset 0 0 60px rgba(255,255,255,0.35)`,
                scale: [1, 1.04, 1],
              }}
              transition={{ backgroundColor: { duration: 1 }, boxShadow: { duration: 1 }, scale: { duration: 3, repeat: Infinity } }}
            />
            {/* LED dots */}
            <div className="absolute inset-[24%] grid grid-cols-6 place-items-center p-[14%] opacity-25">
              {Array.from({ length: 36 }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/80" />
              ))}
            </div>
            <svg viewBox="0 0 600 80" className="absolute inset-x-0 bottom-[2%] h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.path
                  key={active}
                  d={wavePath([38, 58, 76][active])}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </svg>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-5xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                {dict.lights[active].nm}
              </motion.p>
            </AnimatePresence>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {dict.lights.map((light, i) => (
              <button
                key={light.nm}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`rounded-2xl border p-4 text-left transition-all duration-500 ${
                  active === i ? "border-ivory/40 bg-ivory/10" : "border-ivory/10 hover:border-ivory/25"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[i], boxShadow: `0 0 12px ${colors[i]}` }} />
                  <span className="eyebrow text-[0.6rem]">{light.name}</span>
                </span>
                <span className="display mt-2 block text-2xl">{light.nm}</span>
                <span className="mt-1 block text-sm font-light leading-snug text-sand">{light.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* equipment, folded into the technology section to keep the page short */}
      <div id="equipment" className="relative mx-auto mt-20 max-w-7xl border-t border-ivory/10 pt-12">
        <p className="eyebrow text-center text-sand">{equipment.eyebrow}</p>
        <h3 className="display mt-4 text-center text-[clamp(1.9rem,4vw,3rem)] text-ivory">{equipment.title}</h3>
        <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-ivory/10 bg-ivory/10 md:grid-cols-3">
          {equipment.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="group bg-ink p-7 transition-colors duration-500 hover:bg-espresso md:p-9">
              <p className="eyebrow text-[0.6rem] text-rose">{item.brand}</p>
              <p className="display mt-3 text-3xl text-ivory transition-all duration-500 group-hover:italic">{item.title}</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-sand">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
