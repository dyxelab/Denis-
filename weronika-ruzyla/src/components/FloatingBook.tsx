"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink } from "@/content/site";

/** Mobile-only booking pill that appears once the hero is scrolled past. */
export default function FloatingBook({ dict }: { dict: Dictionary }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.8 && scrollYProgress.get() < 0.93;
    if (next !== show) setShow(next);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={bookingLink(dict.bookingMessage)}
          target="_blank"
          rel="noreferrer"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="shine eyebrow fixed inset-x-5 bottom-5 z-30 rounded-full bg-espresso py-4 text-center text-ivory shadow-2xl shadow-ink/30 md:hidden"
        >
          {dict.hero.cta}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
