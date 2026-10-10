"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { bookingLink } from "@/content/site";

/** Mobile-only booking pill that appears once the hero is scrolled past. */
export default function FloatingBook({ dict }: { dict: Dictionary }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  const overSlider = useRef(false);

  // step aside while the before/after slider is on screen, so it never covers the photos
  useEffect(() => {
    const el = document.getElementById("results");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      overSlider.current = e.isIntersecting;
      if (e.isIntersecting) setShow(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.8 && scrollYProgress.get() < 0.93 && !overSlider.current;
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
          className="shine eyebrow fixed inset-x-5 bottom-5 z-30 rounded-full border border-white/30 bg-espresso/40 py-3.5 text-center text-ivory shadow-[0_12px_30px_-12px_rgba(23,19,16,0.6)] backdrop-blur-md md:hidden"
        >
          {dict.hero.cta}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
