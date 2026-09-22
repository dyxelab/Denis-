"use client";

import { motion, type Variants } from "framer-motion";
import ThornVine from "./ThornVine";

const pillars = [
  {
    title: "REALE",
    text: "Partiamo sempre da capi e accessori originali, veri, mai repliche.",
  },
  {
    title: "HOME-MADE",
    text: "Ogni intervento — cuciture, strappi, borchie, stampe — è fatto a mano.",
  },
  {
    title: "UNICO",
    text: "Piccoli lotti, pezzi numerati. Quello che compri non lo trovi altrove.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--background-alt)] px-6 py-24"
    >
      <div className="pointer-events-none absolute -left-10 top-0 opacity-30 blur-sm">
        <ThornVine id="manifesto-l" width={360} height={100} thorns={9} className="w-[260px]" />
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-0 -scale-x-100 opacity-30 blur-sm">
        <ThornVine id="manifesto-r" width={360} height={100} thorns={9} className="w-[260px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          variants={item}
          className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] neon-text"
        >
          IL MANIFESTO
        </motion.span>
        <motion.h2
          variants={item}
          className="mt-4 text-balance font-[family-name:var(--font-display)] text-3xl leading-tight tracking-wide text-white sm:text-4xl"
        >
          NON SEGUIAMO LO STREETWEAR.
          <br />
          LO <span className="neon-text">RICOSTRUIAMO</span> A MANO.
        </motion.h2>
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)]"
        >
          Nikonic nasce dalla strada e dal punk. Prendiamo capi e accessori
          reali, li smontiamo e li rimontiamo secondo la nostra estetica:
          grezza, metallica, ribelle. Il risultato sono composizioni
          irripetibili, pensate per chi non vuole essere uguale a tutti.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={item}
              className="glass rounded-sm border-t-2 border-t-[var(--neon)]/60 px-5 pb-6 pt-5"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] neon-text">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
