"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site } from "@/content/site";
import Monogram from "./Monogram";
import LanguageSwitcher from "./LanguageSwitcher";
import { Facebook, Instagram, WhatsApp } from "./Icons";

const sections = ["home", "about", "works", "treatments", "dermalux", "equipment", "academy", "find"] as const;

type Props = { lang: Locale; dict: Dictionary };

export default function Header({ lang, dict }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          light ? "text-ivory md:text-espresso" : "bg-ivory/75 text-espresso shadow-[0_1px_0_rgba(43,36,32,0.08)] backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-8">
          <a href="#home" aria-label={site.name} className="justify-self-start transition-transform hover:scale-105">
            <Monogram className="h-12 w-auto sm:h-14" />
          </a>
          <a href="#home" className="display text-center text-[1.65rem] leading-[0.8] sm:text-[2rem]">
            Weronika
            <br />
            <span className="italic">Rużyła</span>
          </a>
          <div className="flex items-center gap-5 justify-self-end">
            <LanguageSwitcher lang={lang} className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.menu.open}
              aria-expanded={open}
              className="group flex h-11 w-11 flex-col items-end justify-center gap-[7px]"
            >
              <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-6" />
              <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-8" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#8f7b63] text-ivory"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
              <LanguageSwitcher lang={lang} onNavigate={() => setOpen(false)} />
              <Monogram className="h-14 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.menu.close}
                className="relative flex h-11 w-11 items-center justify-center transition-transform duration-500 hover:rotate-90"
              >
                <span className="absolute h-px w-8 rotate-45 bg-current" />
                <span className="absolute h-px w-8 -rotate-45 bg-current" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-1 py-10">
              {sections.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 py-1"
                >
                  <span className="eyebrow w-6 text-right text-[0.6rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(2.1rem,7vw,3.8rem)] transition-all duration-500 group-hover:italic group-hover:text-rose-soft">
                    {dict.nav[id]}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8 } }}
              exit={{ opacity: 0 }}
              className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 pb-8 sm:flex-row sm:px-8"
            >
              <a href={site.phoneHref} className="eyebrow">
                {site.phone}
              </a>
              <div className="flex gap-5">
                <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp className="h-5 w-5" /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
