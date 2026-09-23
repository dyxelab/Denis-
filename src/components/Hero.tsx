"use client";

import { motion, type Variants } from "framer-motion";

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
      className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-10 text-center lg:min-h-[88vh] lg:pb-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.p
          variants={item}
          className="max-w-xl text-balance font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-[var(--chrome-1)] sm:text-xl lg:max-w-2xl lg:text-3xl"
        >
          COMPOSIZIONI UNICHE SU MARCHI REALI E ORIGINALI
        </motion.p>
        <motion.p
          variants={item}
          className="mt-3 max-w-md text-balance text-sm text-[var(--muted)] lg:max-w-lg lg:text-base"
        >
          Capi e accessori rilavorati a mano, assemblati in composizioni irripetibili.
          Ogni pezzo nasce dalla strada, vive di punk attitude.
        </motion.p>

        <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:mt-10">
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

        <motion.span
          variants={item}
          aria-hidden="true"
          className="mt-14 hidden h-px w-24 bg-gradient-to-r from-transparent via-[var(--neon)]/50 to-transparent lg:block"
        />
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
