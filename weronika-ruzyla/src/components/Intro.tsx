"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Monogram from "./Monogram";
import Wordmark from "./Wordmark";

export default function Intro({ label }: { label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#fbe4ea_0%,#efbfcc_55%,#dc98ac_100%)] text-[#5b2a3a]"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <Monogram draw className="h-28 w-auto text-black sm:h-36" />
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
            className="eyebrow mt-4 text-[#7a4252]"
          >
            {label}
          </motion.p>
          <motion.span
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#5b2a3a]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
