"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  tone?: "dark" | "light";
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const wordVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: 0, transition: { duration: 0.9, delay: 0.06 * i, ease } }),
};

/** Glass pill eyebrow with a pulsing dot. */
export function Eyebrow({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.62rem] ${
        tone === "dark" ? "glass-card text-mocha" : "glass-dark text-sand"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="pulse-dot absolute inset-0 rounded-full bg-rose" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-rose" />
      </span>
      {children}
    </span>
  );
}

export default function SectionHeading({ eyebrow, title, tone = "dark", className = "" }: Props) {
  const words = title.split(" ");
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className={`display mt-6 max-w-4xl text-[clamp(1.55rem,4.2vw,3.1rem)] ${tone === "dark" ? "text-espresso" : "text-ivory"}`}
      >
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span className="inline-block" custom={i} variants={wordVariants}>
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.h2>
    </div>
  );
}
