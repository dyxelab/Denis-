"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink, images } from "@/content/site";
import RotatingBadge from "./RotatingBadge";
import { ArrowRight } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;
const INTRO = 2.2; // wait for the intro curtain before revealing the hero

export default function Hero({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const t = dict.hero;

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] overflow-hidden bg-ink md:bg-cream">
      {/* photo: full-bleed on mobile, arched panel on desktop */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, delay: INTRO - 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-[24%] top-0 overflow-hidden md:inset-auto md:bottom-10 md:right-8 md:top-24 md:w-[42%] md:rounded-[1.5rem] lg:right-16 lg:w-[38%]"
      >
        <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[8%] h-[116%]">
          <motion.div
            initial={{ scale: 1.25 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 3.2, delay: INTRO - 0.6, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={images.hero.src}
              alt="Weronika Rużyła"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover object-[50%_30%]"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/20 md:hidden" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 sm:px-8 md:justify-center md:pb-16"
      >
        <div className="max-w-xl text-ivory md:max-w-[52%] md:text-espresso">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: INTRO + 0.2, ease }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-10 bg-current opacity-60" />
            {t.eyebrow}
          </motion.p>
          <h1 className="display mt-6 text-[clamp(2.9rem,6vw,6.25rem)]">
            {[t.titleA, t.titleB].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 1 ? "italic md:pl-[0.8em]" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: INTRO + 0.3 + i * 0.15, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: INTRO + 0.7, ease }}
            className="mt-5 max-w-md text-[0.95rem] font-light leading-relaxed opacity-90 sm:text-lg"
          >
            {t.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: INTRO + 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a
              href={bookingLink(dict.bookingMessage)}
              target="_blank"
              rel="noreferrer"
              className="shine glass eyebrow rounded-full px-9 py-4 text-ivory transition-transform hover:scale-[1.03] md:border-espresso md:bg-espresso md:text-ivory"
            >
              {t.cta}
            </a>
            <a href="#treatments" className="eyebrow group flex items-center gap-3">
              {t.secondary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: INTRO + 1, ease }}
        className="absolute bottom-16 right-[calc(42%-2.5rem)] z-20 hidden h-36 w-36 text-espresso md:block lg:right-[calc(38%-0.5rem)]"
      >
        <RotatingBadge text={dict.intro} className="h-full w-full rounded-full bg-cream" />
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO + 1.4 }}
        className="eyebrow absolute bottom-6 left-8 z-10 hidden flex-col items-center gap-3 text-[0.6rem] text-mocha md:flex lg:left-16"
      >
        {t.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-current/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-current"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
