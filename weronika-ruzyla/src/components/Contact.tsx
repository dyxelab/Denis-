"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Clock, Facebook, Instagram, MapPin, Phone, WhatsApp } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** "Always with you" chat and the studio's contact details, in one centered column. */
export default function Contact({ dict }: { dict: Dictionary }) {
  const s = dict.support;
  const f = dict.find;
  const chat = useRef<HTMLDivElement>(null);
  const inView = useInView(chat, { once: true, margin: "-10% 0px" });
  const [stage, setStage] = useState(0); // 0 idle, 1 typing, 2 answered

  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => setStage(1), 600);
    const b = setTimeout(() => setStage(2), 1800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [inView]);

  const rows = [
    { icon: Phone, label: f.phone, value: site.phone, href: site.phoneHref },
    { icon: Clock, label: f.hours, value: f.hoursValue },
    ...(site.address
      ? [{ icon: MapPin, label: f.address, value: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}` }]
      : []),
  ];

  return (
    <section id="find" className="blooms px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} />

      <div ref={chat} className="mx-auto mt-12 flex max-w-md flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-[85%] origin-bottom-left self-start rounded-[1.6rem] rounded-bl-md bg-sage px-6 py-4 text-ivory shadow-lg shadow-sage/25"
        >
          {s.question}
        </motion.div>
        <div className="flex min-h-[4.5rem] justify-end">
          <AnimatePresence mode="wait">
            {stage === 1 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-card flex h-11 items-center gap-1.5 self-start rounded-full px-4"
                aria-hidden="true"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-mocha"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="glass-card max-w-[85%] origin-bottom-right self-start rounded-[1.6rem] rounded-br-md px-6 py-4 text-espresso"
              >
                {s.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <a
          href={whatsappLink(s.message)}
          target="_blank"
          rel="noreferrer"
          className="shine eyebrow mt-2 flex items-center justify-center gap-3 rounded-full bg-sage px-7 py-4 text-ivory transition-transform hover:scale-[1.02]"
        >
          <WhatsApp className="h-5 w-5" />
          {s.whatsapp}
        </a>
      </div>

      <Reveal delay={0.1} className="glass-card mx-auto mt-12 max-w-xl rounded-[2rem] px-6 py-8 text-center sm:px-10">
        <p className="eyebrow text-[0.62rem] text-mocha">{f.eyebrow}</p>
        <p className="mx-auto mt-3 max-w-sm leading-relaxed text-mocha">{f.text}</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {rows.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-rose transition-colors duration-500 group-hover:bg-rose group-hover:text-ivory">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="eyebrow mt-3 text-[0.56rem] text-mocha">{label}</span>
                <span className="mt-1 text-lg font-normal text-espresso">{value}</span>
              </>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex flex-col items-center">
                {body}
              </a>
            ) : (
              <div key={label} className="group flex flex-col items-center">
                {body}
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {[
            { href: site.instagram, Icon: Instagram, label: "Instagram" },
            { href: site.facebook, Icon: Facebook, label: "Facebook" },
            { href: `https://wa.me/${site.whatsappNumber}`, Icon: WhatsApp, label: "WhatsApp" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/15 bg-white/50 text-espresso transition-all duration-500 hover:-translate-y-1 hover:border-rose hover:bg-rose hover:text-ivory"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
