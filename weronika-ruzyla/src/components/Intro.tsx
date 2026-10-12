"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Monogram from "./Monogram";
import Wordmark from "./Wordmark";
import { Bats, Moon, introFlights } from "./Autumn";

export default function Intro({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // a refresh always starts at the top, like a first visit
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#f6e6d6_0%,#ebcbad_55%,#d29b72_100%)] text-[#5a3324]"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <Moon className="absolute right-[12%] top-[9%] h-16 w-16 sm:h-20 sm:w-20" />
          <Bats items={introFlights} color="text-[#4a2a1c]/50" />
          <span className="neon-flicker inline-flex"><Monogram draw className="h-28 w-auto text-black sm:h-36" /></span>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
            className="mt-8"
          >
            <Wordmark className="h-20 w-auto sm:h-24" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="eyebrow mt-4 text-[#8a4a2c]"
          >
            {label}
          </motion.p>
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#8a4a2c]/45"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
