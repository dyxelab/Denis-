"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink, images } from "@/content/site";
import { Eyebrow } from "./SectionHeading";
import { ArrowRight } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;
const INTRO = 2.2; // wait for the intro curtain before revealing the hero

export default function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, delay: INTRO - 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image src={images.hero.src} alt="Weronika Rużyła" fill priority sizes="100vw" className="object-cover object-[50%_25%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/25" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-5 pb-20 pt-32 text-center text-ivory sm:pb-24">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: INTRO + 0.1, ease }}>
          <Eyebrow tone="light">{t.eyebrow}</Eyebrow>
        </motion.div>
        <h1 className="display mt-7 text-[clamp(2rem,7.4vw,4.6rem)]">
          {[t.titleA, t.titleB].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${i === 1 ? "text-gradient" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: INTRO + 0.25 + i * 0.15, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: INTRO + 0.7, ease }}
          className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ivory/85 sm:text-lg"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: INTRO + 0.9, ease }}
          className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
        >
          <a
            href={bookingLink(dict.bookingMessage)}
            target="_blank"
            rel="noreferrer"
            className="shine glass eyebrow rounded-full px-10 py-4 text-ivory transition-transform hover:scale-[1.04]"
          >
            {t.cta}
          </a>
          <a href="#treatments" className="eyebrow group flex items-center gap-3 text-ivory/90">
            {t.secondary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO + 1.4 }}
        className="absolute bottom-5 left-1/2 z-10 flex h-9 w-6 -translate-x-1/2 justify-center rounded-full border border-ivory/40 pt-2"
      >
        <motion.span
          className="h-2 w-px bg-ivory"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
