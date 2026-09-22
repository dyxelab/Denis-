"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import ThornVine from "./ThornVine";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center"
    >
      {/* corner atmosphere */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute -left-16 -top-10 opacity-70 blur-[1px] md:opacity-100"
      >
        <ThornVine id="hero-tl" width={420} height={160} thorns={12} className="w-[280px] md:w-[420px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute -right-16 -top-10 -scale-x-100 opacity-70 blur-[1px] md:opacity-100"
      >
        <ThornVine id="hero-tr" width={420} height={160} thorns={12} className="w-[280px] md:w-[420px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="pointer-events-none absolute -bottom-6 -left-20 rotate-6 blur-sm"
      >
        <ThornVine id="hero-bl" width={500} height={140} thorns={10} className="w-[320px] md:w-[500px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="pointer-events-none absolute -bottom-6 -right-20 -scale-x-100 rotate-6 blur-sm"
      >
        <ThornVine id="hero-br" width={500} height={140} thorns={10} className="w-[320px] md:w-[500px]" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.div variants={item} className="w-[280px] sm:w-[380px] md:w-[520px]">
          <Image
            src="/nikonic-logo.jpg"
            alt="Nikonic"
            width={1079}
            height={674}
            priority
            className="h-auto w-full object-contain mix-blend-screen"
          />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-[var(--chrome-1)] sm:text-xl"
        >
          COMPOSIZIONI UNICHE SU MARCHI REALI E ORIGINALI
        </motion.p>
        <motion.p variants={item} className="mt-3 max-w-md text-balance text-sm text-[var(--muted)]">
          Capi e accessori rilavorati a mano, assemblati in composizioni irripetibili.
          Ogni pezzo nasce dalla strada, vive di punk attitude.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#composizioni"
            className="btn-neon px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em]"
          >
            SCOPRI LE COMPOSIZIONI
          </a>
          <a
            href="#manifesto"
            className="btn-neon-outline px-8 py-3 font-[family-name:var(--font-display)] text-sm tracking-[0.2em]"
          >
            IL MANIFESTO
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--neon)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
