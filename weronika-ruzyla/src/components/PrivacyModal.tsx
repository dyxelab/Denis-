"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";

/** Small footer link that opens the GDPR privacy & cookie notice in a glass dialog. */
export default function PrivacyModal({ dict }: { dict: Dictionary["privacy"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="eyebrow mt-4 text-[0.55rem] text-sand/60 underline-offset-4 transition-colors hover:text-ivory hover:underline"
      >
        {dict.link}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="privacy"
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-dark relative flex max-h-[85svh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-espresso/95 text-left text-ivory"
            >
              <div className="flex items-start justify-between gap-4 border-b border-ivory/10 px-6 py-5 sm:px-8">
                <div>
                  <h2 id="privacy-title" className="display text-base tracking-[0.04em] sm:text-lg">
                    {dict.title}
                  </h2>
                  <p className="mt-1 text-xs text-sand/70">{dict.updated}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={dict.close}
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/25 transition-transform duration-500 hover:rotate-90"
                >
                  <span className="absolute h-px w-4 rotate-45 bg-current" />
                  <span className="absolute h-px w-4 -rotate-45 bg-current" />
                </button>
              </div>
              <div className="overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
                {dict.sections.map((s) => (
                  <section key={s.h} className="mb-6 last:mb-0">
                    <h3 className="eyebrow text-[0.62rem] text-rose-soft">{s.h}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-sand">{s.p}</p>
                  </section>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
