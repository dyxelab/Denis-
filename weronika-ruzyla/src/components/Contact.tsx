"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { Clock, Facebook, Instagram, MapPin, Phone, Send, WhatsApp } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** "Always with you" chat + "Find me" details, mirrored around a centered heading. */
export default function Contact({ dict }: { dict: Dictionary }) {
  const s = dict.support;
  const f = dict.find;
  const chat = useRef<HTMLDivElement>(null);
  const inView = useInView(chat, { once: true, margin: "-10% 0px" });
  const [stage, setStage] = useState(0); // 0 idle, 1 typing, 2 answered

  useEffect(() => {
    if (!inView) return;
    const a = setTimeout(() => setStage(1), 700);
    const b = setTimeout(() => setStage(2), 2000);
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
    <section id="find" className="relative overflow-hidden bg-sand px-5 py-20 sm:px-8 md:py-28">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} align="center" className="mx-auto max-w-4xl" />

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* left: the conversation */}
        <div ref={chat} className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease }}
            className="max-w-[85%] origin-bottom-left self-start rounded-[1.75rem] rounded-bl-md bg-sage px-7 py-5 text-lg text-ivory shadow-lg shadow-sage/20"
          >
            {s.question}
          </motion.div>
          <div className="flex min-h-[5.5rem] justify-end">
            <AnimatePresence mode="wait">
              {stage === 1 && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex h-11 items-center gap-1.5 self-start rounded-full bg-ivory/70 px-4"
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
                  initial={{ opacity: 0, scale: 0.8, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="max-w-[85%] origin-bottom-right self-start rounded-[1.75rem] rounded-br-md bg-ivory px-7 py-5 text-lg text-espresso shadow-lg shadow-espresso/10"
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

        {/* right: how to reach the studio */}
        <div className="flex flex-col">
          <p className="eyebrow text-[0.62rem] text-mocha">{f.eyebrow}</p>
          <p className="mt-3 font-light leading-relaxed text-mocha">{f.text}</p>
          <ul className="mt-6">
            {rows.map(({ icon: Icon, label, value, href }, i) => {
              const body = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory text-rose transition-colors duration-500 group-hover:bg-rose group-hover:text-ivory">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="eyebrow text-[0.6rem] text-mocha">{label}</span>
                    <span className="display mt-1 text-[1.75rem] text-espresso">{value}</span>
                  </span>
                  {href && <Send className="h-5 w-5 text-sage transition-transform duration-500 group-hover:rotate-45" />}
                </>
              );
              return (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease }}
                  className="border-b border-espresso/15 first:border-t"
                >
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-5 py-5">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-5 py-5">{body}</div>
                  )}
                </motion.li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center gap-3">
            <span className="eyebrow mr-2 text-[0.6rem] text-mocha">{f.social}</span>
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-espresso/20 text-espresso transition-all duration-500 hover:-translate-y-1 hover:border-rose hover:bg-rose hover:text-ivory"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
