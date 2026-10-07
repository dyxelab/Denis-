"use client";

import { motion } from "framer-motion";

type Props = { className?: string; draw?: boolean; delay?: number };

/** "WR" monogram in an oval frame, recreated from the brand logo. */
export default function Monogram({ className, draw = false, delay = 0 }: Props) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden="true">
      <motion.ellipse
        cx="30"
        cy="40"
        rx="28"
        ry="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        initial={draw ? { pathLength: 0, opacity: 0 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.g
        fill="currentColor"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
        initial={draw ? { opacity: 0, y: 4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: delay + 0.7, ease: "easeOut" }}
      >
        <text x="9" y="43" fontSize="30">W</text>
        <text x="29" y="57" fontSize="28">R</text>
      </motion.g>
    </svg>
  );
}
