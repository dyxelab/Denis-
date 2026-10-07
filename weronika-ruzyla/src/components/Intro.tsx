"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Monogram from "./Monogram";

const KEY = "wr-intro-seen";

export default function Intro({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const t = setTimeout(() => setVisible(false), seen ? 0 : 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sand text-ivory"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <Monogram draw className="h-28 w-auto sm:h-36" />
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.04em" }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
            className="display mt-8 text-4xl italic sm:text-5xl"
          >
            Weronika Rużyła
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="eyebrow mt-4"
          >
            {label}
          </motion.p>
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] bg-ivory/70"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
