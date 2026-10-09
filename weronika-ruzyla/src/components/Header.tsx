"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site } from "@/content/site";
import Monogram from "./Monogram";
import LanguageSwitcher from "./LanguageSwitcher";
import { Facebook, Instagram, WhatsApp } from "./Icons";

const sections = ["home", "about", "works", "treatments", "results", "dermalux", "equipment", "academy", "find"] as const;

type Props = { lang: Locale; dict: Dictionary };

export default function Header({ lang, dict }: Props) {
  const { scrollY } = useScroll();
  const [dark, setDark] = useState(true); // is the section under the header dark?
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y > 400 && y > prev + 4 && !hidden) setHidden(true);
    else if (y < prev - 4 && hidden) setHidden(false);
  });

  // watch only the thin band behind the header: dark sections switch it to light text
  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setDark(visible.size > 0);
      },
      { rootMargin: "-28px 0px -96% 0px" },
    );
    document.querySelectorAll('[data-tone="dark"]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-40 px-3 pt-2 sm:px-6 sm:pt-2.5"
      >
        <div
          className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full border px-3 py-0.5 backdrop-blur-lg transition-colors duration-500 sm:px-5 ${
            dark ? "border-white/25 bg-white/10 text-ivory" : "border-white/40 bg-white/15 text-espresso"
          }`}
        >
          <a href="#home" aria-label={site.name} className="justify-self-start transition-transform hover:scale-105">
            <Monogram className="h-8 w-auto sm:h-9" />
          </a>
          <a href="#home" className="display text-center text-[0.68rem] leading-tight tracking-[0.22em] sm:text-[0.8rem]">
            Weronika Rużyła
          </a>
          <div className="flex items-center gap-4 justify-self-end">
            <LanguageSwitcher lang={lang} className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.menu.open}
              aria-expanded={open}
              className="group flex h-9 w-9 flex-col items-center justify-center gap-[6px]"
            >
              <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-4" />
              <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-6" />
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
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#7d6b56]/85 text-ivory backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
              <LanguageSwitcher lang={lang} onNavigate={() => setOpen(false)} />
              <Monogram className="h-12 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.menu.close}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition-transform duration-500 hover:rotate-90"
              >
                <span className="absolute h-px w-5 rotate-45 bg-current" />
                <span className="absolute h-px w-5 -rotate-45 bg-current" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
              {sections.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="display rounded-full px-6 py-2 text-[clamp(1.15rem,4.6vw,2.1rem)] transition-colors duration-300 hover:bg-white/10 hover:text-rose-soft"
                >
                  {dict.nav[id]}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 pb-10"
            >
              <a href={site.phoneHref} className="eyebrow">
                {site.phone}
              </a>
              <div className="flex gap-3">
                {[
                  { href: site.instagram, Icon: Instagram, label: "Instagram" },
                  { href: site.facebook, Icon: Facebook, label: "Facebook" },
                  { href: `https://wa.me/${site.whatsappNumber}`, Icon: WhatsApp, label: "WhatsApp" },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="glass-dark flex h-11 w-11 items-center justify-center rounded-full">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
