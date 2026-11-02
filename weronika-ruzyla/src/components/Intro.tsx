"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Monogram from "./Monogram";
import Wordmark from "./Wordmark";
import Snow from "./Snow";

export default function Intro({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // a refresh always starts at the top, like a first visit
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#8e2034_0%,#5c1020_55%,#2e0710_100%)] text-gold-soft"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <Snow count={40} className="absolute inset-0" />
          {/* warm halo that breathes behind the logo */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(242,200,107,0.35)_0%,rgba(242,200,107,0)_65%)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0.7, 1], scale: [0.6, 1, 0.95, 1] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <div className="relative">
            <Monogram draw className="h-28 w-auto text-gold drop-shadow-[0_0_12px_rgba(242,200,107,0.55)] sm:h-36" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
            className="mt-11 sm:mt-12"
          >
            <Wordmark className="h-20 w-auto drop-shadow-[0_0_10px_rgba(242,200,107,0.35)] sm:h-24" />
          </motion.div>
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gold/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
