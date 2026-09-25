"use client";

import { motion, type Variants } from "framer-motion";

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
      className="relative overflow-hidden px-6 py-14"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.span
          variants={item}
          className="font-[family-name:var(--font-display)] text-xs tracking-[0.45em] neon-text sm:tracking-[0.4em]"
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
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]"
        >
          Nikonic nasce dalla strada e dal punk. Prendiamo capi e accessori
          reali, li smontiamo e li rimontiamo secondo la nostra estetica:
          grezza, metallica, ribelle. Il risultato sono composizioni
          irripetibili, pensate per chi non vuole essere uguale a tutti.
        </motion.p>

        <div className="mt-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:text-left">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={item}
              className={`mx-auto max-w-[15rem] sm:mx-0 ${
                i === 1 ? "sm:mt-8" : i === 2 ? "sm:mt-2" : "sm:mt-0"
              } ${i === 2 ? "sm:ml-auto sm:text-right" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`mx-auto mb-3 block h-px w-10 bg-[var(--neon)]/60 sm:mx-0 ${i === 2 ? "sm:ml-auto" : ""}`}
              />
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
