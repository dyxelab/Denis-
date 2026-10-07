"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { site, whatsappLink } from "@/content/site";
import SectionHeading from "./SectionHeading";
import { Send, WhatsApp } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Support({ dict }: { dict: Dictionary["support"] }) {
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

  return (
    <section id="support" className="relative overflow-hidden bg-sand px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />

        <div className="flex flex-col gap-4">
          {/* chat-like exchange */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease }}
            className="max-w-[85%] origin-bottom-left self-start rounded-[1.75rem] rounded-bl-md bg-sage px-7 py-5 text-lg text-ivory shadow-lg shadow-sage/20"
          >
            {dict.question}
          </motion.div>

          <div ref={chat} className="flex min-h-[5.5rem] justify-end">
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
                  {dict.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="mt-6 flex flex-col gap-3"
          >
            <a
              href={site.phoneHref}
              className="group flex items-center justify-between gap-4 rounded-full border border-sage py-2 pl-6 pr-2 text-sage transition-colors hover:bg-sage hover:text-ivory"
            >
              <span className="eyebrow text-[0.62rem] sm:text-[0.72rem]">{dict.contact}</span>
              <span className="whitespace-nowrap text-base tracking-wide sm:text-lg">{site.phone}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-sage transition-transform duration-500 group-hover:rotate-45">
                <Send className="h-5 w-5" />
              </span>
            </a>
            <a
              href={whatsappLink(dict.message)}
              target="_blank"
              rel="noreferrer"
              className="shine eyebrow flex items-center justify-center gap-3 rounded-full bg-sage px-7 py-4 text-ivory transition-transform hover:scale-[1.02]"
            >
              <WhatsApp className="h-5 w-5" />
              {dict.whatsapp}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
