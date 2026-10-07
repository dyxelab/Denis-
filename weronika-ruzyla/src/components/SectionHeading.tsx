"use client";

import { motion } from "framer-motion";
import { HeartFocus, Sparkle } from "./Icons";

type Props = {
  eyebrow: string;
  title: string;
  icon?: "sparkle" | "heart";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const wordVariants = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: 0, transition: { duration: 1, delay: 0.08 * i, ease } }),
};

export default function SectionHeading({ eyebrow, title, icon = "sparkle", align = "left", tone = "dark", className = "" }: Props) {
  const Icon = icon === "heart" ? HeartFocus : Sparkle;
  const words = title.split(" ");
  return (
    <div className={`${align === "center" ? "text-center items-center" : "items-start"} flex flex-col ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-mocha" : "text-sand"}`}
      >
        <motion.span
          initial={{ rotate: -90, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-rose"
        >
          <Icon className="h-6 w-6" />
        </motion.span>
        {eyebrow}
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        className={`display mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)] ${tone === "dark" ? "text-espresso" : "text-ivory"}`}
      >
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className="inline-block"
                custom={i}
                variants={wordVariants}
              >
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
