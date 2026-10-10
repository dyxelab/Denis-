"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const colors = ["#5b8cff", "#ff5a5f", "#c23a5a"];

/** sine wave whose period grows with the wavelength, so the three lights look physically different */
function wavePath(period: number, amp = 16, width = 600, mid = 40) {
  let d = `M0 ${mid}`;
  for (let x = 0; x <= width; x += 4) d += ` L${x} ${(mid + Math.sin((x / period) * Math.PI * 2) * amp).toFixed(2)}`;
  return d;
}

type Props = { dict: Dictionary["dermalux"]; equipment: Dictionary["equipment"] };

export default function Dermalux({ dict, equipment }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % dict.lights.length), 4000);
    return () => clearInterval(id);
  }, [paused, dict.lights.length]);

  const color = colors[active];

  return (
    <section id="dermalux" data-tone="dark" className="relative overflow-hidden bg-ink px-5 py-20 text-ivory sm:px-8 md:py-28">
      {/* ambient light following the active wavelength: a gradient, no blur filter */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ background: `radial-gradient(60% 45% at 50% 42%, ${color}40, rgba(0,0,0,0) 70%)` }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} tone="light" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-sand">{dict.text}</p>
        </Reveal>
        <Reveal delay={0.25} className="mt-6 flex flex-wrap justify-center gap-2">
          {dict.tags.map((tag) => (
            <span key={tag} className="glass-dark eyebrow rounded-full px-4 py-2 text-[0.58rem] text-sand">
              {tag}
            </span>
          ))}
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Reveal className="relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[18rem]">
            <div className="absolute inset-0 rounded-full border border-ivory/10" />
            <div className="absolute inset-[12%] rounded-full border border-ivory/10" />
            <motion.div
              className="absolute inset-[24%] rounded-full"
              animate={{ backgroundColor: color, boxShadow: `0 0 70px 18px ${color}80, inset 0 0 50px rgba(255,255,255,0.35)` }}
              transition={{ duration: 1 }}
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-2xl text-white sm:text-3xl"
              >
                {dict.lights[active].nm}
              </motion.p>
            </AnimatePresence>
          </Reveal>
          <svg viewBox="0 0 600 80" className="mx-auto -mt-2 h-12 w-full max-w-md" preserveAspectRatio="none" aria-hidden="true">
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

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {dict.lights.map((light, i) => (
              <button
                key={light.nm}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`glass-dark flex flex-col items-center rounded-3xl p-4 text-center transition-all duration-500 ${
                  active === i ? "!border-ivory/40 !bg-ivory/10" : "hover:!border-ivory/25"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[i], boxShadow: `0 0 12px ${colors[i]}` }} />
                  <span className="eyebrow text-[0.58rem]">{light.name}</span>
                </span>
                <span className="display mt-2 text-lg">{light.nm}</span>
                <span className="mt-1 text-sm leading-snug text-sand">{light.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* equipment, folded into the technology section to keep the page short */}
        <div id="equipment" className="mx-auto mt-14 max-w-5xl">
          <SectionHeading eyebrow={equipment.eyebrow} title={equipment.title} tone="light" />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {equipment.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="glass-dark group rounded-3xl p-6 text-center transition-colors duration-500 hover:!bg-ivory/10">
                <p className="eyebrow text-[0.58rem] text-rose">{item.brand}</p>
                <p className="display mt-3 text-base tracking-[0.04em] text-ivory">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-sand">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
