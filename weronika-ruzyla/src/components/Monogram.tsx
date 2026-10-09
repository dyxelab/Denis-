"use client";

import { motion } from "framer-motion";
import { logo } from "@/content/site";

type Props = { className?: string; draw?: boolean; delay?: number };

/**
 * The real WR logo, used as a CSS mask so it takes the current text colour
 * (white on dark sections, espresso on light ones) from a single file.
 */
export default function Monogram({ className = "", draw = false, delay = 0 }: Props) {
  return (
    <motion.span
      role="img"
      aria-hidden="true"
      className={`inline-block bg-current ${className}`}
      style={{
        aspectRatio: `${logo.width} / ${logo.height}`,
        WebkitMaskImage: `url(${logo.src})`,
        maskImage: `url(${logo.src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      initial={draw ? { opacity: 0, scale: 0.85, clipPath: "inset(100% 0 0 0)" } : false}
      animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
